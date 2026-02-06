-- CRM simple para ventas de seguros

CREATE TABLE leads (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(30),
    email VARCHAR(180),
    service VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    source VARCHAR(80),
    status VARCHAR(50) NOT NULL,
    notes TEXT
);

CREATE TABLE activities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    lead_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type ENUM('call', 'whatsapp', 'email') NOT NULL,
    summary VARCHAR(255) NOT NULL,
    next_followup_at TIMESTAMP NULL,
    CONSTRAINT fk_activities_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Índices solicitados
CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_leads_service ON leads (service);
CREATE INDEX idx_leads_created_at ON leads (created_at);

CREATE INDEX idx_activities_created_at ON activities (created_at);
