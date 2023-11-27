# Ayre

> *"... I'll support you!"*

Ayre is a Visual Question Answering project created by members of [this organization](https://github.com/projectayre) as part of our semester V projects and coursework during our Bachelor's degree. This is primarily a research based project, since Visual Question Answering with Sentiment Analysis is a significant research gap that we would like to address. This project will feature several components coming together as a complete full-stack AI project.

## Planned/Implemented features [checklist]

### AI

All AI development to done using Torch, for better support with transformers. (20/11/2023: Proof of concept is complete)

- [x] ~~Sentiment Analysis on images using integrating fuzzy logic.~~
- [x] NEW: Semantic Image Segmentation for Improved Understanding of the image.
- [x] Visual Question Answering task using data from semantic segmentation
- [x] MLOps pipelines that can be easily imported and deployed inside the backend.
- [ ] (Future Work) At least 1 Journal and 1 Conference paper based on novel approaches made here.
- [ ] (Optional) HuggingFace integration (Probably future work now).

### Frontend

A simple, beautiful UI/UX with the following features:

- [ ] Responsive Design for accessibility.
- [x] Light/Dark themes.
- [ ] OAuth integration, with some of the benefits.
- [ ] Deployment on Vercel/Github Pages.
- [ ] (Optional) A Loading screen.

### Backend

- [x] Minimal and fast backend created in FastAPI.
- [x] Modular design for improved CI/CD.
- [x] Basic self-hosting for anywhere access.
- [ ] (Future Work) Database connectivity for live storage of queries and information.
- [ ] (Optional) Improved cloud-based hosting with accessible APIs.
