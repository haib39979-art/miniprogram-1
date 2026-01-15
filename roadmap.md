# Health Calendar Product Roadmap (12 Weeks)

## Goals and Scope
- **Goal**: A "Health Calendar" Mini Program for users aged 18–35, combining lunar/solar calendar, weather, herbal knowledge, daily recipes, and personalized constitution advice.
- **Scope**: Core feed based on "Today's Wellness", supporting basic calendar & weather, herbal & recipe content cards, constitution assessment & personalized recommendations. Reserved space for social & check-in features.
- **Design Direction**: Youthful + Traditional Book Border Visual Language. Illustrations primarily, limited real photos, leaning towards a cute style.

## MVP Features
- **Basic**: Lunar/Solar date, weather conditions, daily Yi/Ji (Dos/Don'ts).
- **Feed**: Herbal knowledge cards, daily recipe recommendations (considering regional characteristics).
- **Personalization**: Simple constitution test (8–12 questions), outputting three types of advice (ingredients, routine, tea).
- **Operation Base**: Check-in records & 7-day trends, disclaimer & health guidelines.

## 12-Week Actionable Task List

### Weeks 1–2: Research & Positioning (Deliverable: Positioning Package)
- Define 3 core scenarios: Morning commute / Lunch break / Bedtime (1 paragraph each).
- Deconstruct 5 competitors (Xiaohongshu/Mini Programs/Apps): Information structure, card density, interaction methods.
- Finalize content boundaries: What to say / What not to say (avoid "disease/medication" related topics).
- **Deliverables**: User Personas ×2, Scenarios ×3, Requirement Priorities (P0/P1/P2), One-sentence Value Proposition.

### Week 3: Information Architecture & Content Model (Deliverable: IA + Field Table)
- **Pages**: Today, Calendar, Constitution Test, Recommendation Results, Check-in/Me.
- **Content Model**:
  - **Herbal Card**: Title / One-sentence Benefit / Suitable Constitution / Contraindications / Season / Usage / Source.
  - **Recipe Card**: Title / Ingredients / Key Steps / Suitable Constitution / Regional Tag / Notes / Source.
- **Deliverables**: Site Map, Page Flow Diagram, Content Field Table (Spreadsheet).

### Weeks 4–5: Wireframes & Key Flows (Deliverable: Lo-fi Prototype)
- "Today" Page "Three-Section" Wireframe: Basic Info (Date+Weather) → Today's Advice (3 items) → Content Feed (Herbal/Recipe).
- Constitution Test Wireframe: 8–12 questions, complete within 3 minutes, result page gives "actionable advice".
- Check-in Wireframe: Today's Action List (3 items) + One-tap Check-in + 7-Day Trend.
- **Deliverables**: Clickable Lo-fi Prototype (No Visuals).

### Week 6: Visuals & Design System (Deliverable: UI Kit)
- **Tone**: Youthful + Traditional Page Border (Control decoration ratio to ensure readability).
- **Components**: Cards, Tags, Buttons, Modals, Empty States, Loading, Top Info Area.
- **Deliverables**: Color Palette / Typography / Spacing Guidelines + Component Library (Reusable).

### Week 7: Hi-fi & Usability Testing (Deliverable: Iteration List)
- Walkthrough with 8–10 people: Can they understand "What to do today" at a glance?
- Record issues: Information hierarchy, copy understanding, click paths.
- **Deliverables**: Hi-fi Prototype + Issue List + Iterated Version.

### Weeks 8–9: Content Production & Proofreading (Deliverable: First Content Package)
- **Target First Package**: 100–150 Herbal items, 60–90 Recipes.
- Each item must contain: Contraindications / Source / "Non-medical Advice" Disclaimer.
- **Deliverables**: Content Table (Importable) + Copy Guidelines (Length, Tone, Tag Rules).

### Week 10: Personalization Rules & Cold Start (Deliverable: Rule Table + Result Page)
- Constitution Tags (5–7 types) + 3 Advice Templates per type (Diet/Routine/Tea).
- Rule Priority: Contraindications > Constitution > Season > Preferences.
- Cold Start: "Seasonal General Advice" for untested users, guide to take the test.
- **Deliverables**: Rule Mapping Table + Hi-fi Result Page.

### Week 11: Development Handoff & Acceptance (Deliverable: Handoff Package)
- Output Slices / Specs / Animation Guide (Restrained animation).
- Define Tracking: Test completion rate, Check-in rate, Card click-through rate, 7-day retention.
- **Deliverables**: Handoff Package + Interaction Guide + Tracking Plan.

### Week 12: Launch & Operation Start (Deliverable: Launch Package)
- Complete Privacy & Disclaimer pages.
- First Week Campaign: Continuous Check-in, Solar Term Theme Page (1 item).
- **Deliverables**: Submission Materials, First Week Operation Assets (Share Cards, Cover).

## Figma File Structure (Create Directly)
- **00_Cover**: Project Intro, Links, Version (v0.1/v0.2).
- **01_Foundations**: Colors / Type / Spacing / Grid / Shadows.
- **02_Components**: Buttons, Tags, Cards (Herbal/Recipe/Action), Nav, Modal, Empty, Loading.
- **03_Patterns**: Today Info Area, Feed Layout, Quiz Styles, Result Advice Module, Check-in Module.
- **04_Pages_Lofi**: Today / Calendar / Quiz / Result / Me (Lo-fi).
- **05_Pages_Hifi**: Same as above (Hi-fi).
- **06_Prototype**: Main flow connections & notes.
- **07_Content**: Copy components, Tag system, Example content cards.
- **08_Handoff**: Slices, Specs, State descriptions, Tracking table screenshots/links.

**Naming Suggestions**: Components `C/Card/Herb`, `C/Card/Recipe`, `C/Tag`; Pages `P/Today`, `P/Quiz`, `P/Result`; States `State/Empty`, `State/Error`, `State/Loading`.

## Content Table Template (For Spreadsheet/Import)
**herb**  
id | name | one_liner | benefit | suitable_constitution | avoid_people | season | how_to_use | image_type | source | risk_note

**recipe**  
id | name | ingredients | steps_short | suitable_constitution | avoid_people | season | region_tag | time_cost | source | risk_note

**quiz**  
id | question | options(A/B/C/D) | score_mapping | tag_output

**rules**  
constitution_tag | season_tag | boost_tags | block_tags | result_templates(3 items)

## Developer Handoff Checklist (One Page)
- Page List + Route Naming.
- State per Page: Default / No Data / No Network / Loading / Error.
- Component List (Must Reuse).
- Content Field Table + 5 Example Data Entries.
- Tracking Plan (Event Name, Trigger, Parameters).
- Disclaimer & Privacy Page Copy (Fixed Display Position).

## Tech & Collab Suggestions
(Keep concise)
