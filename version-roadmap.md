# Health Calendar Version Roadmap (Detailed)

## Version Numbering Rules (Proposed)
- `v0.x.y`: Alpha/Beta stage, allowing rapid iteration and IA adjustments.
- `v1.x.y`: Stable release stage, prioritizing stability, operations, and rollback capabilities.
- `x` (Major): Major goal or IA changes.
- `y` (Minor): New perceptible feature module or a set of experience enhancements.
- `z` (Patch): Bug fixes, copy/style tweaks, performance optimization, no new feature entry points.

## v0.1.x (Usable Prototype / Internal Beta)
**Overall Goal**: Run through the main flow, complete demonstrable experience, replaceable content, compliance baseline in place.

### v0.1.0 (Skeleton)
- **Must-have Pages**:
  - **Today Page**: Date (Lunar/Solar placeholder ok) + Weather placeholder + Content Feed placeholder (at least 6 cards).
  - **Detail Page**: Herb Detail / Recipe Detail (can share one template).
  - **Me Page**: Entry collection (Quiz / Check-in / Privacy / Disclaimer).
  - Privacy Policy Page + Disclaimer Page.
- **Must-have Interactions**:
  - Today → Detail → Back (No info loss).
  - Access Privacy/Disclaimer from Me page.
- **Data Strategy**:
  - Use static data (JSON/Cloud DB), ensure fields can be displayed.
- **Acceptance Checklist**:
  - App opens to Today page without white screen.
  - Cards can open details, details show Contraindications and Source fields.

### v0.1.1 (Quiz & Result Flow)
- **Must-have Pages**:
  - **Constitution Quiz**: 8–12 questions (4 options each).
  - **Result Page**: Output 1 Constitution Tag + 3 Advice items (Diet/Routine/Tea).
- **Must-have Interactions**:
  - Quiz supports "Back to previous", "Exit confirmation".
  - Result page re-accessible after completion (from Me entry).
- **Copy & Visuals**:
  - Quiz question & result copy length standards (Title ≤ 16 chars; Advice 20–40 chars each).
- **Acceptance Checklist**:
  - Quiz completable within 3 minutes.
  - Result advice copyable/shareable (implement one first).

### v0.1.2 (Check-in & Basic Retention)
- **Must-have Pages**:
  - **Today's Action**: Fixed 3 items (from "Result Template" or fixed copy).
  - **Check-in Record**: 7-day list (Date + Status).
- **Must-have Interactions**:
  - One-tap Check-in (No repeat count for same day, toast on repeat).
  - 7-day list supports viewing day details (reuse Today page structure).
- **Acceptance Checklist**:
  - Check-in status immediately visible (Button/Card change).
  - 7-day list logic correct (No cross-day errors).

### v0.1.3 (Beta Quality & State Completion)
- **State Completion** (For every key page):
  - Loading, Empty Data, No Network, Location Failed (if used), Generic Error.
- **Performance & Experience**:
  - Today page first screen priority loading (Info first, then Feed).
  - Font size/line height readability check.
- **Internal Beta Process**:
  - Walkthrough with 8–10 people, collect 10 issues and prioritize.
- **Acceptance Checklist**:
  - Main flow non-blocking: Today → Detail → Quiz → Result → Check-in.
  - No "Cure/Treatment/Medical Substitute" wording.

## v0.2.x (Public Beta Prep / Content & Personalization Boost)
**Overall Goal**: Improve recommendation credibility and retention, systematic content package, measurable data.

### v0.2.0 (Personalization Rules v1 + Content First Package)
- **Personalization Rules v1**:
  - Constitution Tag + Season Tag weighted recommendation.
  - Contraindications have highest priority (Filter out if hit).
- **Content First Package**:
  - 100–150 Herbs, 60–90 Recipes (Proofreading & Source fields complete).
  - Tag System finalized: Season/Constitution/Region (≤ 5 tags per item).
- **Acceptance Checklist**:
  - Recommendation result explainable: Show "Why recommended" (Tag or one-liner).
  - Rule table maintainable (Not hardcoded in page copy).

### v0.2.1 (Content Operations: Favorite/History/Filter)
- **Choose One** (Priority High to Low):
  - **Favorite**: Detail page favorite, Today page favorite entry.
  - **History**: Auto-record last 20 viewed items.
  - **Filter**: Filter content by Season/Constitution/Region.
- **Acceptance Checklist**:
  - Feature entry does not disturb main flow (Secondary entry).

### v0.2.2 (Data Tracking & Dashboard)
- **Must-have Tracking**:
  - Quiz Start/Complete, Check-in Click/Success, Card Impression/Click, Share Click.
- **Metric Targets** (Trend first):
  - Quiz Completion Rate, Check-in Rate, Card CTR, 7-day Retention.
- **Acceptance Checklist**:
  - Every event has clear trigger & parameters (Page/Content ID).

### v0.2.3 (Public Beta Candidate RC)
- **Pre-submission Check**:
  - Privacy Policy entry clear, Auth modal copy accurate.
  - Disclaimer fixed accessible (Me/Settings).
  - Global search for sensitive words & medical promises.
- **Acceptance Checklist**:
  - Public Beta experience stable, no obvious crashes or freezes.
