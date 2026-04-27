# Visual Documentation & Data Modeling: eSIR 2.1

This document provides the technical and process diagrams for the eSIR 2.1 system, essential for an IT Business Analyst's technical portfolio.

---

## 1. Flowchart: Patient Referral Process (BPMN 2.0 Style)

This diagram shows the end-to-end process from referral creation to patient handover.

```mermaid
graph TD
    subgraph "Faskes Pengirim (Origin)"
        A[Start: Pasien Butuh Rujukan] --> B[Input Data Pasien]
        B --> C[Cari RS Tujuan via Smart Finder]
        C --> D[Pilih RS & Kirim Rujukan]
    end

    subgraph "Sistem eSIR (Core)"
        D --> E{Validasi & Notifikasi}
        E -- Notif --> F[Faskes Tujuan]
    end

    subgraph "Faskes Tujuan (Destination)"
        F --> G{Terima Rujukan?}
        G -- Tidak --> H[Rujukan Ditolak/Update Status]
        G -- Ya --> I[Alokasi Kamar & Update Status: Accepted]
    end

    subgraph "Logistik & Transportasi"
        I --> J[Tugaskan Driver & Ambulans]
        J --> K[Mulai Perjalanan: Status Traveling]
        K --> L[Live GPS Tracking]
        L --> M[Ambulans Tiba di Tujuan]
    end

    subgraph "Serah Terima (Handover)"
        M --> N[Scan QR Handover oleh IGD Tujuan]
        N --> O[Verifikasi Data & Audit]
        O --> P[Selesai: Status Completed]
    end

    H --> B
```

---

## 2. UML Diagrams

### 2.1 Use Case Diagram
Describes the interactions between users and the system.

```mermaid
useCaseDiagram
    actor "Admin Pusat" as AP
    actor "Admin Faskes" as AF
    actor "Sopir Ambulans" as SA
    actor "Sistem Reverb" as SR

    AP --> (Manage Faskes & Users)
    AP --> (View Global Analytics)
    
    AF --> (Create/Edit Referral)
    AF --> (Monitor Incoming Referrals)
    AF --> (Manage Bed Capacity)
    AF --> (Scan QR Handover)
    
    SA --> (Update Location)
    SA --> (Start/End Mission)
    SA --> (View Navigation)
    
    SR --> (Broadcast Live GPS)
    (Broadcast Live GPS) <.. (Update Location) : <<include>>
```

### 2.2 Sequence Diagram: Real-time Tracking
Describes the message flow during an active referral journey.

```mermaid
sequenceDiagram
    participant D as Driver (Mobile PWA)
    participant S as Server (Laravel)
    participant R as Reverb (WebSocket)
    participant H as Hospital Admin (Web)

    D->>S: POST /tracking/location (Lat, Lng)
    S->>S: Store Tracking Point in DB
    S->>R: Broadcast: AmbulanceLocationUpdated
    R->>H: Push: location-updated (Live Map)
    H->>H: Update Marker Position
    
    alt ETA Change
        S->>R: Broadcast: ETAUpdated
        R->>H: Update ETA Display
    end
```

---

## 3. Data Mapping & ERD

### 3.1 Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    FASKES ||--o{ USER : "has"
    FASKES ||--o{ AMBULANCE : "owns"
    FASKES ||--o{ BED_CAPACITY : "manages"
    FASKES ||--o{ REFERRAL : "as_origin"
    FASKES ||--o{ REFERRAL : "as_destination"
    
    PATIENT ||--o{ REFERRAL : "involved_in"
    
    USER ||--o{ REFERRAL : "created_by"
    USER ||--o{ REFERRAL : "drives"
    USER ||--o{ MESSAGE : "sends"
    
    REFERRAL ||--o{ MESSAGE : "contains"
    REFERRAL ||--o{ AUDIT_LOG : "tracked_by"
    REFERRAL ||--o{ REFERRAL_DOCUMENT : "has"
    REFERRAL ||--o{ TRACKING_POINT : "records"

    FASKES {
        string name
        string type
        string address
        float latitude
        float longitude
    }
    
    REFERRAL {
        string referral_number
        string status
        string diagnosis
        int gcs_score
        float response_time_minutes
    }
```

### 3.2 Data Dictionary (Sample)

| Table | Column | Type | Description |
|:---|:---|:---|:---|
| **referrals** | status | ENUM | draft, sent, accepted, rejected, traveling, arrived, completed |
| **faskes** | latitude | DECIMAL | GPS Latitude coordinate for distance calculation |
| **patients** | nik | VARCHAR(16) | National Identity Number (Unique Identifier) |
| **tracking_points** | coordinates | POINT | Geospatial point for route history |
