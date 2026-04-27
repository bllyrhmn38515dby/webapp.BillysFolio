# Case Studies & UI/UX Design: eSIR 2.1

This document showcases practical applications of the eSIR 2.1 system and details the design philosophy of the user interface.

---

## 1. Case Study: Critical Cardiac Referral

### 1.1 Scenario
- **Patient**: Mr. X, 55 years old, presenting with Acute Myocardial Infarction (AMI) at Puskesmas Cibungbulang.
- **Action**: The doctor at the Puskesmas needs to refer Mr. X to a hospital with a Cath Lab (Type A or B) immediately.

### 1.2 System Execution
1.  **Smart RS Finder**: The doctor enters "AMI" and vital signs (GCS 15, BP 90/60). The system ranks RS Pusat Pertamina as the best choice because it has an ICU bed and is 12 minutes away via road distance, whereas a closer hospital has zero bed capacity.
2.  **Real-time Handover**: As soon as the referral is "Sent", the ER at RS Pusat Pertamina receives a push notification and a sound alert.
3.  **Transit**: Paramedics start the trip. The hospital tracks the ambulance. They see the patient's heart rate dropping via the "Clinical Chat" updates from the driver.
4.  **Arrival**: The ambulance arrives. The ER nurse scans the QR code on the driver's phone. Status becomes "Arrived" instantly. The patient is moved directly to the Cath Lab.

### 1.3 Results
- **Response Time**: 4 minutes (from sent to accepted).
- **Audit Trace**: Full clinical data and GPS logs are stored for post-medical audit.

---

## 2. Wireframe & Mockup Descriptions

### 2.1 Dashboard: Medical Light Glassmorphism
- **Background**: Soft gradient (Indigo to Cyan) with a subtle mesh animation.
- **Cards**: Translucent white panels with 15px blur radius and thin borders.
- **Navigation**: Sidebar with clean icons (Lucide/Heroicons), focused on quick access.

### 2.2 Live Map Interface
- **Base Layer**: CartoDB Positron (Light mode) for high contrast with medical icons.
- **Ambulance Marker**: Pulsing blue icon showing direction.
- **ETA Overlay**: Top-right floating glass card showing "Estimated Arrival: 14:02 (8 mins)".

### 2.3 Referral Form (Mobile-First)
- **Step-by-step UI**: Simple inputs to avoid cognitive load in emergencies.
- **Biometric Ready**: Fingerprint icon placeholder for future secure verification.

---

## 3. Future Roadmap (BA Recommendations)

Based on the current gap analysis, the following phases are planned:

### Phase 21: Government Interoperability
- **Goal**: Integration with SATUSEHAT (HL7 FHIR).
- **Requirement**: Mapping local DB schema to FHIR resources (Patient, Encounter, Observation).

### Phase 22: AI Triage Assistant
- **Goal**: Auto-triage based on voice and vitals.
- **Requirement**: NLP engine to parse doctor's voice notes into structured data.

### Phase 23: Regional Resource Balancing
- **Goal**: Predictive modeling of bed shortages.
- **Requirement**: Integration with city-wide public health data.
