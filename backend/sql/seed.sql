USE layover;

-- -------------------------------------------------------
-- Airports
-- -------------------------------------------------------

INSERT INTO airports (id, name, city, country, coverage_status, customs_reentry_minutes, timezone) VALUES
('YVR', 'Vancouver International Airport', 'Vancouver', 'Canada', 'full', 45, 'America/Vancouver');

-- -------------------------------------------------------
-- Itineraries for YVR
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('yvr-3hr', 'YVR', 3, 'Richmond Quick Loop', 'Stay close to the airport — grab dim sum in Richmond and walk the dyke trail. Back before boarding.', 3),
('yvr-5hr', 'YVR', 5, 'Downtown Vancouver Quick Hit', 'SkyTrain to Waterfront, walk the seawall to Canada Place, back before boarding.', 4),
('yvr-8hr', 'YVR', 8, 'Stanley Park & Granville Island', 'Full day loop — seawall walk in Stanley Park, ferry to Granville Island, back via SkyTrain.', 7);

-- -------------------------------------------------------
-- Steps for yvr-3hr
-- -------------------------------------------------------

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('yvr-3hr-1', 'yvr-3hr', 1, 'Clear customs and collect bags', 'Allow time at international arrivals before leaving the terminal.', 30, 0, NULL, NULL),
('yvr-3hr-2', 'yvr-3hr', 2, 'Grab dim sum in Richmond', 'Aberdeen Centre and the surrounding blocks have some of the best dim sum outside Hong Kong. No reservation needed at lunch.', 60, 10, 'Walk', NULL),
('yvr-3hr-3', 'yvr-3hr', 3, 'Walk the West Dyke Trail', 'Flat waterfront path with views of the North Shore mountains. Easy 20-minute stroll.', 20, 10, 'Walk', NULL),
('yvr-3hr-4', 'yvr-3hr', 4, 'Return to airport', 'Walk back to the terminal. Allow 45 minutes for customs re-entry and security.', 45, 5, 'Walk', NULL);

-- -------------------------------------------------------
-- Steps for yvr-5hr
-- -------------------------------------------------------

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('yvr-5hr-1', 'yvr-5hr', 1, 'Clear customs and collect bags', 'Allow time at international arrivals before leaving the terminal.', 30, 0, NULL, NULL),
('yvr-5hr-2', 'yvr-5hr', 2, 'SkyTrain to Waterfront Station', 'Canada Line from YVR-Airport station, no transfer needed. ~25 minutes.', 25, 5, 'SkyTrain', '4.00'),
('yvr-5hr-3', 'yvr-5hr', 3, 'Walk the seawall to Canada Place', 'Flat, scenic walk along the harbour past the Convention Centre and cruise ship terminal.', 45, 5, 'Walk', NULL),
('yvr-5hr-4', 'yvr-5hr', 4, 'Lunch at the waterfront', 'Several casual spots along the seawall. Budget 45 minutes.', 45, 5, 'Walk', NULL),
('yvr-5hr-5', 'yvr-5hr', 5, 'Return to airport', 'SkyTrain from Waterfront back to YVR. Allow 45 minutes for customs re-entry and security.', 25, 5, 'SkyTrain', '4.00');

-- -------------------------------------------------------
-- Steps for yvr-8hr
-- -------------------------------------------------------

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('yvr-8hr-1', 'yvr-8hr', 1, 'Clear customs and collect bags', 'Allow time at international arrivals before leaving the terminal.', 30, 0, NULL, NULL),
('yvr-8hr-2', 'yvr-8hr', 2, 'SkyTrain to Waterfront Station', 'Canada Line from YVR-Airport station, no transfer needed.', 25, 5, 'SkyTrain', '4.00'),
('yvr-8hr-3', 'yvr-8hr', 3, 'Walk the Stanley Park seawall', 'The full seawall loop is 10km — do the first half to Third Beach and turn back. Stunning views of the city and mountains.', 90, 15, 'Walk', NULL),
('yvr-8hr-4', 'yvr-8hr', 4, 'Lunch in Yaletown', 'Dense restaurant strip with good casual options. 45 minutes.', 45, 15, 'Walk', NULL),
('yvr-8hr-5', 'yvr-8hr', 5, 'Ferry to Granville Island', 'Aquabus from the south end of Hornby St. Short crossing, runs every 15 minutes.', 30, 10, 'Ferry', '4.50'),
('yvr-8hr-6', 'yvr-8hr', 6, 'Granville Island Public Market', 'Browse the market, grab a coffee or pastry. Leave by the posted time to make your flight.', 45, 5, 'Walk', NULL),
('yvr-8hr-7', 'yvr-8hr', 7, 'Return to airport', 'Bus 50 from Granville Island to Waterfront, then SkyTrain to YVR. Allow 45 minutes for customs re-entry and security.', 40, 10, 'Bus + SkyTrain', '4.00');

-- -------------------------------------------------------
-- Logistics for YVR
-- -------------------------------------------------------

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'YVR',
'Most nationalities can enter Canada transit-free for layovers under 48 hours. However, some passport holders require a Transit Visa or Electronic Travel Authorization (eTA) even for short stops. Check the IRCC website before leaving the terminal — enforcement is strict.',
'Baggage storage is available at both the domestic and international terminals. Locate the storage counter after baggage claim. Cost is approximately $10–15 CAD per bag per day. Coin lockers are not available.',
'Allow a minimum of 45 minutes to clear customs and security when returning from the city. International arrivals re-enter through the same customs process as arriving passengers. Have your boarding pass and passport ready.');
