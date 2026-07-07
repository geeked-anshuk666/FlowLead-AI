# Project Concepts

Core definitions and business rules for GrowEasy leads processing:

- **Lead Mapping:** Matching arbitrary raw headers (e.g., "Phone Number", "cellphone", "num") to the unified database field `mobileWithoutCountryCode`.
- **Early Validation:** CSV rows containing neither a valid email nor a valid mobile key-value are skipped instantly on upload.
- **Model Cascade:** Fallback routing logic to ensure zero downtime. If Gemini API throws errors, the system calls OpenRouter models in sequential order, ending on the `openrouter/free` model cascade.
