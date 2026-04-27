# IT Business Analyst Portfolio: eSIR 2.1 Project

This document contains professional BA documentation for the **eSIR 2.1 (Sistem Informasi Rujukan Terintegrasi)** project.

---

## 1. Business Requirements Document (BRD)

### 1.1 Project Overview
**Project Name**: eSIR 2.1 (Sistem Informasi Rujukan Terintegrasi)
**Executive Summary**: eSIR 2.1 is an enterprise-grade platform designed to streamline and digitize the patient referral process between healthcare facilities (Faskes) in Indonesia. It aims to reduce response times, optimize bed occupancy, and ensure real-time tracking of patients during transit.

### 1.2 Business Objectives
- **OB1**: Reduce the average referral response time by 40%.
- **OB2**: Eliminate manual/paper-based referral documentation and replace it with audit-ready digital records.
- **OB3**: Provide 100% visibility of ambulance locations and patient status during the referral journey.
- **OB4**: Optimize hospital resource allocation by providing real-time bed capacity data.

### 1.3 Scope of Work
**In-Scope**:
- Multi-tier User Authentication (Admin Pusat, Admin Faskes, Driver).
- Patient Management (NIK-based registration).
- Real-time Referral Workflow (Draft -> Sent -> Accepted -> Traveling -> Arrived).
- Live GPS Tracking & OSRM Routing.
- Medical Analytics Dashboard (ICD-10 Trends).
- Automated Triage scoring (GCS-based).

**Out-of-Scope**:
- Direct billing/payment integration (handled by insurance/BPJS).
- Internal hospital pharmacy management.

---

## 2. Software Requirements Specification (SRS)

### 2.1 Functional Requirements
- **FR1 (Authentication)**: The system shall allow users to log in based on roles with different permissions.
- **FR2 (Referral Creation)**: The system shall allow Faskes A to create a referral for a patient and select a target Faskes B based on proximity and bed availability.
- **FR3 (Real-time Tracking)**: The system shall broadcast ambulance GPS coordinates to the receiving hospital using WebSockets (Laravel Reverb).
- **FR4 (Audit Trail)**: The system shall log every status change, identifying the user and timestamp.
- **FR5 (Reporting)**: The system shall generate PDF referral letters with dynamic QR codes for secure handover.

### 2.2 Non-Functional Requirements
- **NFR1 (Performance)**: Real-time GPS updates should have a latency of less than 2 seconds.
- **NFR2 (Security)**: All clinical data must be encrypted and accessible only to authorized personnel involved in the referral.
- **NFR3 (Reliability)**: The system must support offline caching of tracking data when signal loss occurs.
- **NFR4 (Usability)**: The UI must follow the "Medical Light Glassmorphism" design system for high readability in emergency settings.

---

## 3. User Stories & Acceptance Criteria

| ID | User Story | Acceptance Criteria |
|:---|:---|:---|
| **US01** | As a **Doctor (Faskes A)**, I want to see recommended hospitals based on distance and bed availability, so that I can send the patient to the most suitable facility quickly. | 1. System displays list of RS sorted by distance.<br>2. Bed availability is visible for each RS.<br>3. Scoring logic considers both distance and beds. |
| **US02** | As an **ER Admin (Faskes B)**, I want to track the incoming ambulance in real-time, so that I can prepare the medical team and equipment before arrival. | 1. Live map shows ambulance icon moving.<br>2. Estimated Time of Arrival (ETA) is updated every 30 seconds.<br>3. Route path is visible on the map. |
| **US03** | As an **Ambulance Driver**, I want to start a mission and get navigation to the target hospital, so that I can focus on driving safely while the system updates everyone else. | 1. "Mulai Perjalanan" button changes status to 'Traveling'.<br>2. Integration with Google Maps for navigation.<br>3. Automatic arrival detection when entering the geofence. |

---

## 4. Stakeholder Matrix

| Stakeholder | Role | Power | Interest | Strategy |
|:---|:---|:---|:---|:---|
| **Ministry of Health** | Regulator | High | High | Manage Closely (Compliance) |
| **Hospital Directors** | Decision Makers | High | Medium | Keep Satisfied |
| **ER Doctors/Nurses** | Primary Users | Medium | High | Keep Informed (UX Focus) |
| **Ambulance Drivers** | Operators | Low | High | Keep Informed (Mobile Ease) |
| **IT Dept / Admins** | Technical Support | Medium | Medium | Maintain Support |

---

## 5. Gap Analysis

| Feature | Current State (eSIR 2.1) | Ideal Future State | Gap |
|:---|:---|:---|:---|
| **Data Standardization** | Internal database schema. | SATUSEHAT (IHS) Integration. | Integration with HL7 FHIR / Ministry of Health API. |
| **Diagnostics** | Manual input & Autocomplete. | AI-Assisted Diagnosis. | Machine Learning models for symptom-to-ICD10 mapping. |
| **Communication** | Text Chat only. | Tele-Emergency Video Call. | WebRTC implementation for live medical consultation. |
| **Patient Identification**| NIK Manual Entry. | Biometric / Face Sync. | Integration with Dukcapil Biometric API. |

---

## 6. Product Backlog Management (Priority List)

1.  **P1**: SATUSEHAT API Integration (Compliance).
2.  **P1**: Multi-factor Authentication (MFA) for security.
3.  **P2**: AI Clinical Decision Support System (CDSS).
4.  **P2**: Advanced Analytics for Regional Referral Patterns.
5.  **P3**: Integration with Patient Wearables (Live Vital Signs Sync).
