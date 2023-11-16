"""Python file to store the structure of the segmentation UNet as a class"""
from torch.nn import ConvTranspose2d, Conv2d, MaxPool2d, Module
from torch.nn import Sequential, ReLU, BatchNorm2d, ModuleList
from torch.nn import functional as F
import torch

class DoubleConv(Module):
    def __init__(self, in_channels, out_channels):
        super(DoubleConv, self).__init__()
        self.conv = Sequential(
            Conv2d(in_channels, out_channels, 3, 1, 1, bias=False),
            BatchNorm2d(out_channels),
            ReLU(inplace=True),
            Conv2d(out_channels, out_channels, 3, 1, 1, bias=False),
            BatchNorm2d(out_channels),
            ReLU(inplace=True),
        )

    def forward(self, x):
        return self.conv(x)

class UNet(Module):
    def __init__(
            self, in_channels=3, out_channels=1, features=[64, 128, 256],
    ):
        super(UNet, self).__init__()
        self.ups = ModuleList()
        self.downs = ModuleList()
        self.pool = MaxPool2d(kernel_size=2, stride=2)

        # Down part of UNET
        for feature in features:
            self.downs.append(DoubleConv(in_channels, feature))
            in_channels = feature

        # Up part of UNET
        for feature in reversed(features):
            self.ups.append(
                ConvTranspose2d(
                    feature*2, feature, kernel_size=4, stride=2, padding=1, bias=False
                )
            )
            self.ups.append(DoubleConv(feature*2, feature))

        self.bottleneck = DoubleConv(features[-1], features[-1]*2)
        self.final_conv = Conv2d(features[0], out_channels, kernel_size=3, padding=1)

    def forward(self, x):
        skip_connections = []

        for down in self.downs:
            x = down(x)
            skip_connections.append(x)
            x = self.pool(x)

        x = self.bottleneck(x)
        skip_connections = skip_connections[::-1]

        for idx in range(0, len(self.ups), 2):
            x = self.ups[idx](x)
            skip_connection = skip_connections[idx//2]

            if x.shape != skip_connection.shape:
                x = F.interpolate(x, size=skip_connection.shape[2:], mode='bilinear', align_corners=False)

            concat_skip = torch.cat((skip_connection, x), dim=1)
            x = self.ups[idx+1](concat_skip)

        return self.final_conv(x)