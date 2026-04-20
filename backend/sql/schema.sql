CREATE TABLE airports (
    id                      VARCHAR(10)  NOT NULL,
    name                    VARCHAR(255) NOT NULL,
    city                    VARCHAR(100) NOT NULL,
    country                 VARCHAR(100) NOT NULL,
    coverage_status         ENUM('full', 'limited', 'unsupported') NOT NULL,
    customs_reentry_minutes INT          NOT NULL DEFAULT 0,
    timezone                VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE itineraries (
    id                 CHAR(36)     NOT NULL,
    airport_id         VARCHAR(10)  NOT NULL,
    duration_hours     INT          NOT NULL,
    title              VARCHAR(255) NOT NULL,
    summary            TEXT         NOT NULL,
    min_duration_hours INT          NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (airport_id) REFERENCES airports(id)
);

CREATE TABLE itinerary_steps (
    id               CHAR(36)      NOT NULL,
    itinerary_id     CHAR(36)      NOT NULL,
    step_order       INT           NOT NULL,
    title            VARCHAR(255)  NOT NULL,
    description      TEXT          NOT NULL,
    duration_minutes INT           NOT NULL,
    transit_minutes  INT           NOT NULL DEFAULT 0,
    transit_method   VARCHAR(100),
    cost             DECIMAL(10,2),
    PRIMARY KEY (id),
    FOREIGN KEY (itinerary_id) REFERENCES itineraries(id)
);

CREATE TABLE logistics (
    id                CHAR(36)    NOT NULL DEFAULT (UUID()),
    airport_id        VARCHAR(10) NOT NULL UNIQUE,
    visa_notes        TEXT,
    bag_storage_notes TEXT,
    reentry_notes     TEXT,
    last_updated      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (airport_id) REFERENCES airports(id)
);
