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

-- -------------------------------------------------------
-- Airports (10 new)
-- -------------------------------------------------------

INSERT INTO airports (id, name, city, country, coverage_status, customs_reentry_minutes, timezone) VALUES
('SIN', 'Singapore Changi Airport', 'Singapore', 'Singapore', 'full', 30, 'Asia/Singapore'),
('NRT', 'Tokyo Narita International Airport', 'Tokyo', 'Japan', 'full', 45, 'Asia/Tokyo'),
('ICN', 'Incheon International Airport', 'Seoul', 'South Korea', 'full', 30, 'Asia/Seoul'),
('HKG', 'Hong Kong International Airport', 'Hong Kong', 'Hong Kong', 'full', 30, 'Asia/Hong_Kong'),
('DXB', 'Dubai International Airport', 'Dubai', 'United Arab Emirates', 'full', 30, 'Asia/Dubai'),
('AMS', 'Amsterdam Airport Schiphol', 'Amsterdam', 'Netherlands', 'full', 30, 'Europe/Amsterdam'),
('LHR', 'London Heathrow Airport', 'London', 'United Kingdom', 'full', 45, 'Europe/London'),
('CDG', 'Paris Charles de Gaulle Airport', 'Paris', 'France', 'full', 45, 'Europe/Paris'),
('SYD', 'Sydney Kingsford Smith Airport', 'Sydney', 'Australia', 'full', 45, 'Australia/Sydney'),
('FRA', 'Frankfurt Airport', 'Frankfurt', 'Germany', 'full', 30, 'Europe/Berlin');

-- -------------------------------------------------------
-- Itineraries for SIN
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('sin-3hr', 'SIN', 3, 'Changi Village Hawker Lunch', 'Quick taxi to Changi Village for some of the best hawker food in Singapore and a walk along the coastal boardwalk. Back before boarding.', 3),
('sin-5hr', 'SIN', 5, 'Merlion & Marina Bay', 'MRT into the city to see the Merlion, walk the waterfront promenade past Marina Bay Sands, and grab lunch at Boat Quay.', 5),
('sin-8hr', 'SIN', 8, 'Gardens by the Bay & Chinatown', 'Full city loop — supertrees at Gardens by the Bay, walk the Marina Bay waterfront, then lunch and wandering in Chinatown.', 7);

-- Steps for sin-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('sin-3hr-1', 'sin-3hr', 1, 'Clear immigration', 'Singapore immigration is efficient. Expect 15–20 minutes at the counters. Collect bags if checked.', 20, 10, 'Walk', NULL),
('sin-3hr-2', 'sin-3hr', 2, 'Taxi to Changi Village', 'Grab a metered cab from the taxi rank at arrivals. The ride to Changi Village takes about 15 minutes along the coast.', 15, 5, 'Walk', '15.00'),
('sin-3hr-3', 'sin-3hr', 3, 'Lunch at Changi Village Hawker Centre', 'One of the most authentic hawker centres in Singapore. Order chicken rice, laksa, or satay from multiple stalls and share a table in the open-air hall.', 55, 5, 'Walk', NULL),
('sin-3hr-4', 'sin-3hr', 4, 'Changi Point Coastal Walk', 'Short boardwalk over the water with views toward Malaysia and Pulau Ubin island. Flat, shaded, and peaceful.', 20, 5, 'Walk', NULL),
('sin-3hr-5', 'sin-3hr', 5, 'Return to airport', 'Taxi back to Changi. Allow 30 minutes for security on return — Changi re-entry is fast but don\'t skip the buffer.', 15, 0, 'Taxi', '15.00');

-- Steps for sin-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('sin-5hr-1', 'sin-5hr', 1, 'Clear immigration', 'Singapore immigration moves quickly. Allow 20 minutes and proceed to the MRT station below the terminal.', 20, 5, 'Walk', NULL),
('sin-5hr-2', 'sin-5hr', 2, 'MRT to Bayfront', 'Take the East-West line to City Hall, then transfer to the Circle Line one stop to Bayfront. About 35 minutes, air-conditioned throughout.', 35, 5, 'MRT', '2.50'),
('sin-5hr-3', 'sin-5hr', 3, 'Gardens by the Bay Supertree Grove', 'The outdoor supertree grove is free. Walk under the towering vertical gardens and cross the OCBC Skyway bridge if it\'s open.', 40, 10, 'Walk', NULL),
('sin-5hr-4', 'sin-5hr', 4, 'Walk to Merlion Park', 'Follow the waterfront path past Marina Bay Sands, cross the Helix Bridge, and continue to the Merlion. Excellent skyline views the whole way.', 35, 10, 'Walk', NULL),
('sin-5hr-5', 'sin-5hr', 5, 'Lunch at Boat Quay', 'The old riverside quay has a dense strip of casual restaurants and coffee shops with outdoor seating over the Singapore River.', 55, 5, 'Walk', NULL),
('sin-5hr-6', 'sin-5hr', 6, 'Return to airport by MRT', 'Reverse the route from City Hall back to Changi Airport. Allow 30 minutes for security re-entry on arrival.', 35, 0, 'MRT', '2.50');

-- Steps for sin-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('sin-8hr-1', 'sin-8hr', 1, 'Clear immigration', 'Allow 20 minutes through immigration. The MRT station is directly below the terminal.', 20, 5, 'Walk', NULL),
('sin-8hr-2', 'sin-8hr', 2, 'MRT to Bayfront', 'East-West line to City Hall, transfer to Circle Line to Bayfront. About 35 minutes door to door.', 35, 10, 'MRT', '2.50'),
('sin-8hr-3', 'sin-8hr', 3, 'Gardens by the Bay', 'Start with the outdoor Supertree Grove (free), then visit the Cloud Forest conservatory for the indoor waterfall and cloud mountain. Worth the entry fee.', 75, 15, 'Walk', '28.00'),
('sin-8hr-4', 'sin-8hr', 4, 'Marina Bay waterfront walk', 'Walk the promenade from Gardens across the Helix Bridge to Merlion Park. The full stretch is about 2 km with great views of the skyline.', 40, 15, 'Walk', NULL),
('sin-8hr-5', 'sin-8hr', 5, 'MRT to Chinatown', 'One stop from City Hall to Chinatown on the North-East line. The Sri Mariamman Temple is right at the exit.', 10, 5, 'MRT', '1.50'),
('sin-8hr-6', 'sin-8hr', 6, 'Chinatown food street and shophouses', 'Walk Pagoda Street and Smith Street for hawker stalls, dried goods, and temples. Smith Street food court is good for a sit-down meal.', 70, 5, 'Walk', NULL),
('sin-8hr-7', 'sin-8hr', 7, 'Return to airport', 'MRT from Chinatown to Changi Airport via the East-West line (~35 min). Allow 30 minutes for security re-entry.', 35, 0, 'MRT', '2.00');

-- -------------------------------------------------------
-- Itineraries for NRT
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('nrt-3hr', 'NRT', 3, 'Naritasan Temple & Old Town', 'Bus to Narita city for the ancient Shinshoji Temple and the atmospheric Omotesando shopping street. Back before boarding.', 3),
('nrt-5hr', 'NRT', 5, 'Narita Full Day', 'Extended walk through the temple complex and grounds, lunch on Omotesando, and a visit to the adjacent Narita-san Park.', 4),
('nrt-8hr', 'NRT', 8, 'Tokyo Day Trip — Shinjuku', 'Narita Express into Shinjuku for a full morning in the city. Shinjuku Gyoen, lunch in the kabukicho area, and back before dark.', 7);

-- Steps for nrt-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('nrt-3hr-1', 'nrt-3hr', 1, 'Clear customs and collect bags', 'Allow 20–25 minutes through Japanese immigration and customs. Signage is excellent in English.', 25, 10, 'Walk', NULL),
('nrt-3hr-2', 'nrt-3hr', 2, 'Bus to Narita city', 'Take the Airport Liner bus from the Terminal 1 or 2 bus stop (Gate 1). About 20 minutes to Narita Station. Runs frequently.', 20, 5, 'Bus', '300.00'),
('nrt-3hr-3', 'nrt-3hr', 3, 'Naritasan Shinshoji Temple', 'Walk up the stone steps to this 1,000-year-old Buddhist temple. The main hall, three-story pagoda, and incense courtyard are all striking. Free entry.', 30, 10, 'Walk', NULL),
('nrt-3hr-4', 'nrt-3hr', 4, 'Omotesando shopping street', 'The old stone-paved road leading to the temple is lined with eel restaurants, sembei shops, and craft stalls. Good for a quick browse or snack.', 20, 10, 'Walk', NULL),
('nrt-3hr-5', 'nrt-3hr', 5, 'Return to airport', 'Bus back from Narita Station to the terminal. Allow 45 minutes at the airport for customs re-entry and security.', 20, 0, 'Bus', '300.00');

-- Steps for nrt-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('nrt-5hr-1', 'nrt-5hr', 1, 'Clear customs and collect bags', 'Allow 25 minutes through customs. Follow signs to the bus terminal outside.', 25, 10, 'Walk', NULL),
('nrt-5hr-2', 'nrt-5hr', 2, 'Bus to Narita city', 'Airport Liner bus from T1 or T2 Gate 1 to Narita Station. About 20 minutes.', 20, 5, 'Bus', '300.00'),
('nrt-5hr-3', 'nrt-5hr', 3, 'Naritasan Shinshoji Temple', 'Spend time exploring the full main compound — the Great Main Hall, Komyodo, the pagodas, and the bell tower. No rush this time.', 55, 10, 'Walk', NULL),
('nrt-5hr-4', 'nrt-5hr', 4, 'Narita-san Park', 'Behind the temple is a large traditional garden with ponds, waterfalls, and stone bridges. Quiet and beautiful, especially with seasonal foliage.', 40, 10, 'Walk', NULL),
('nrt-5hr-5', 'nrt-5hr', 5, 'Lunch on Omotesando', 'The street specializes in unaju (eel over rice) and grilled rice crackers. Most restaurants have English menus. Expect to spend ¥1,500–2,500.', 55, 10, 'Walk', NULL),
('nrt-5hr-6', 'nrt-5hr', 6, 'Return to airport', 'Bus from Narita Station back to your terminal. Allow 45 minutes for re-entry and security.', 20, 0, 'Bus', '300.00');

-- Steps for nrt-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('nrt-8hr-1', 'nrt-8hr', 1, 'Clear customs and collect bags', 'Allow 25 minutes. Proceed to the Narita Express (N\'EX) platform in the basement of T1 or T2.', 25, 10, 'Walk', NULL),
('nrt-8hr-2', 'nrt-8hr', 2, 'Narita Express to Shinjuku', 'N\'EX direct to Shinjuku Station. About 80 minutes, reserved seating. Buy the round-trip ticket — it\'s significantly cheaper than two singles.', 80, 10, 'Train', '4070.00'),
('nrt-8hr-3', 'nrt-8hr', 3, 'Shinjuku Gyoen National Garden', 'One of Japan\'s best gardens — a mix of formal French, English landscape, and traditional Japanese styles. Buy a pastry at the café inside. ¥500 entry.', 75, 15, 'Walk', '500.00'),
('nrt-8hr-4', 'nrt-8hr', 4, 'Lunch near Shinjuku Station', 'The basement food halls of Takashimaya Times Square have excellent set lunches. Alternatively, the alleys behind the east exit have cheap ramen and soba from ¥800.', 55, 10, 'Walk', NULL),
('nrt-8hr-5', 'nrt-8hr', 5, 'Return Narita Express from Shinjuku', 'Board the N\'EX back to the airport. The train runs roughly every 30 minutes — check the schedule before leaving the garden. Allow 45 minutes for customs and security at NRT.', 80, 0, 'Train', NULL);

-- -------------------------------------------------------
-- Itineraries for ICN
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('icn-3hr', 'ICN', 3, 'Songdo Central Park', 'Short bus ride to the planned city of Songdo for a walk around the canal park and waterfront. Clean, calm, and close.', 3),
('icn-5hr', 'ICN', 5, 'Myeongdong & Namsan', 'AREX train into Seoul for the city\'s busiest shopping street, street food, and a walk up toward Namsan Tower.', 4),
('icn-8hr', 'ICN', 8, 'Gyeongbokgung & Bukchon', 'Full Seoul day — the grand Joseon-era palace, the preserved hanok village of Bukchon, and lunch in Insadong.', 7);

-- Steps for icn-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('icn-3hr-1', 'icn-3hr', 1, 'Clear immigration', 'Incheon immigration is efficient, especially at T2. Allow 20 minutes. Korean immigration uses automated e-gates for many nationalities.', 20, 10, 'Walk', NULL),
('icn-3hr-2', 'icn-3hr', 2, 'Bus to Songdo Central Park', 'Airport limousine bus (Route 303) from T1 or T2 to Songdo. Runs every 20–30 minutes. About 25 minutes to the park.', 25, 5, 'Bus', '2500.00'),
('icn-3hr-3', 'icn-3hr', 3, 'Walk Songdo Central Park', 'The park is modeled loosely on Central Park but surrounded by modern skyscrapers and a network of canals. Rent a paddleboat or just walk the perimeter path.', 50, 5, 'Walk', NULL),
('icn-3hr-4', 'icn-3hr', 4, 'Canal waterfront', 'The canal boardwalk between the park and the bay has cafés, a convenience store, and benches facing the water. Good for a coffee break.', 20, 5, 'Walk', NULL),
('icn-3hr-5', 'icn-3hr', 5, 'Return to airport', 'Bus 303 back to the terminal. Allow 30 minutes for security and re-entry at ICN.', 25, 0, 'Bus', '2500.00');

-- Steps for icn-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('icn-5hr-1', 'icn-5hr', 1, 'Clear immigration', 'Allow 20 minutes through Incheon immigration. T2 is particularly fast.', 20, 5, 'Walk', NULL),
('icn-5hr-2', 'icn-5hr', 2, 'AREX express to Seoul Station', 'The all-stop AREX (not the express) takes about 55 minutes and is cheaper. The direct express takes 43 minutes but costs more. Either works.', 55, 10, 'Train', '4950.00'),
('icn-5hr-3', 'icn-5hr', 3, 'Myeongdong street food and shopping', 'Exit 6 of Myeongdong Station puts you in the middle of it. Vendors line the pedestrian streets — try tteokbokki, hotteok, and twisted potatoes. Cosmetics shops everywhere.', 60, 15, 'Walk', NULL),
('icn-5hr-4', 'icn-5hr', 4, 'Walk toward Namsan Tower', 'Head up the hill from Myeongdong toward N Seoul Tower. The cable car is optional but the walk through the forested path and the view from below the tower are worth it.', 40, 10, 'Walk', NULL),
('icn-5hr-5', 'icn-5hr', 5, 'Return AREX to Incheon', 'Train from Seoul Station back to the airport. Allow 30 minutes for security re-entry.', 55, 0, 'Train', '4950.00');

-- Steps for icn-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('icn-8hr-1', 'icn-8hr', 1, 'Clear immigration', 'Allow 20 minutes through Incheon customs. Proceed to the AREX platform below the terminal.', 20, 5, 'Walk', NULL),
('icn-8hr-2', 'icn-8hr', 2, 'AREX to Seoul Station', 'About 55 minutes on the commuter AREX. Transfer to subway Line 3 at Seoul Station for one stop to Gyeongbokgung.', 60, 10, 'Train', '4950.00'),
('icn-8hr-3', 'icn-8hr', 3, 'Gyeongbokgung Palace', 'The grandest of Seoul\'s five palaces. Allow 60–75 minutes to walk the grounds — Geunjeongjeon throne hall, Gyeonghoeru pavilion on the lake, and Hyangwonjeong garden. ₩3,000 entry.', 70, 15, 'Walk', '3000.00'),
('icn-8hr-4', 'icn-8hr', 4, 'Bukchon Hanok Village', 'Walk up through the traditional tile-roofed neighborhood between the palaces. The alleys at Gahoe-dong have the best views back toward the palace and Namsan Tower.', 45, 15, 'Walk', NULL),
('icn-8hr-5', 'icn-8hr', 5, 'Lunch in Insadong', 'The tea houses and traditional restaurants in Insadong are a short walk from Bukchon. Ssamziegil courtyard has good casual options — bibimbap, japchae, and Korean pancakes.', 60, 10, 'Walk', NULL),
('icn-8hr-6', 'icn-8hr', 6, 'Return AREX to Incheon', 'Subway back to Seoul Station, then AREX to Incheon Airport. Allow 30 minutes for security re-entry.', 60, 0, 'Train', '4950.00');

-- -------------------------------------------------------
-- Itineraries for HKG
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('hkg-3hr', 'HKG', 3, 'Tung Chung & Ngong Ping Cable Car', 'MTR to nearby Tung Chung for dim sum or noodles, then a look at the gondola station at the base of the world\'s longest bi-cable gondola.', 3),
('hkg-5hr', 'HKG', 5, 'Tsim Sha Tsui Harbour Walk', 'MTR into Kowloon for the Avenue of Stars, the harbour promenade, and lunch in one of Hong Kong\'s best casual restaurant corridors.', 4),
('hkg-8hr', 'HKG', 8, 'Victoria Peak & Hong Kong Island', 'Ferry to Wan Chai, tram up to Victoria Peak, then walk down through the Mid-Levels to Central for lunch and the Star Ferry back.', 7);

-- Steps for hkg-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('hkg-3hr-1', 'hkg-3hr', 1, 'Clear customs', 'Allow 20 minutes through Hong Kong immigration. The counters are fast and the terminal is well organized.', 20, 5, 'Walk', NULL),
('hkg-3hr-2', 'hkg-3hr', 2, 'MTR to Tung Chung', 'Tung Chung Line direct from Airport Station — 7 minutes, one stop. The MTR station is connected to the terminal by a covered walkway.', 7, 5, 'MTR', '11.00'),
('hkg-3hr-3', 'hkg-3hr', 3, 'Dim sum or noodles in Tung Chung', 'The MTR exit opens into CityGate shopping mall, which has several congee and noodle shops on the ground floor. Alternatively, walk two minutes to the town\'s wet market strip for cheaper dai pai dong stalls.', 50, 10, 'Walk', NULL),
('hkg-3hr-4', 'hkg-3hr', 4, 'Ngong Ping 360 cable car station', 'The gondola departs from a station five minutes from CityGate. Even if you\'re not riding, the view of the hillside departure and the queues of gondolas is impressive. Rides take 25 minutes each way — only do it if you have time.', 25, 5, 'Walk', NULL),
('hkg-3hr-5', 'hkg-3hr', 5, 'Return MTR to airport', 'MTR one stop back to Airport Station. Allow 30 minutes for security re-entry.', 7, 0, 'MTR', '11.00');

-- Steps for hkg-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('hkg-5hr-1', 'hkg-5hr', 1, 'Clear customs', 'Allow 20 minutes through immigration. Follow signs to the Airport Express and MTR platforms.', 20, 5, 'Walk', NULL),
('hkg-5hr-2', 'hkg-5hr', 2, 'MTR to Tsim Sha Tsui', 'Tung Chung Line to Nam Cheong, transfer to West Rail Line one stop to East Tsim Sha Tsui. About 25 minutes total.', 25, 5, 'MTR', '14.00'),
('hkg-5hr-3', 'hkg-5hr', 3, 'Avenue of Stars and harbour promenade', 'The refurbished waterfront promenade has views across the harbour to Hong Kong Island. Walk the full 500m stretch, find a spot on the railing, and watch the ferry traffic. The Bruce Lee statue is here too.', 40, 10, 'Walk', NULL),
('hkg-5hr-4', 'hkg-5hr', 4, 'Lunch in Tsim Sha Tsui', 'The side streets one block back from the promenade are dense with cha chaan teng (Hong Kong tea houses) and roast goose restaurants. Set lunches are cheap and excellent.', 60, 10, 'Walk', NULL),
('hkg-5hr-5', 'hkg-5hr', 5, 'Nathan Road browse', 'A short walk up Nathan Road — the neon-lit main drag of Kowloon — past electronics shops, tailor windows, and the Peninsula Hotel.', 25, 10, 'Walk', NULL),
('hkg-5hr-6', 'hkg-5hr', 6, 'Return MTR to airport', 'Reverse the route back. Allow 30 minutes for security re-entry at HKG.', 25, 0, 'MTR', '14.00');

-- Steps for hkg-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('hkg-8hr-1', 'hkg-8hr', 1, 'Clear customs', 'Allow 20 minutes. Follow signs to the Airport Express platform — it departs from inside the terminal building.', 20, 5, 'Walk', NULL),
('hkg-8hr-2', 'hkg-8hr', 2, 'Airport Express to Hong Kong Station', 'Direct express to the Island, 24 minutes. One of the best airport rail connections in the world.', 24, 10, 'Train', '115.00'),
('hkg-8hr-3', 'hkg-8hr', 3, 'Tram to Victoria Peak', 'Walk to the Peak Tram lower terminal (15 minutes from Central). The funicular climbs to 396m — the views over the harbour and Kowloon are the best in Asia. Expect a queue. Buy the round-trip tram + Sky Terrace ticket.', 70, 15, 'Tram', '139.00'),
('hkg-8hr-4', 'hkg-8hr', 4, 'Walk down through the Mid-Levels', 'The Old Peak Road and Hatton Road trail down through forested hillside and residential terraces into Soho. Takes about 45 minutes and passes through the Mid-Levels escalator zone.', 45, 10, 'Walk', NULL),
('hkg-8hr-5', 'hkg-8hr', 5, 'Lunch in Soho or Central', 'Central and Soho have Hong Kong\'s densest restaurant scene — dim sum houses, izakayas, and everything in between. Pick a side street and walk until something looks right.', 60, 10, 'Walk', NULL),
('hkg-8hr-6', 'hkg-8hr', 6, 'Star Ferry to Tsim Sha Tsui and back', 'The seven-minute ferry crossing between Central Pier 7 and Tsim Sha Tsui is one of the world\'s great short journeys. Cross one way for the views, then take the MTR back.', 15, 10, 'Ferry', '4.00'),
('hkg-8hr-7', 'hkg-8hr', 7, 'Airport Express back to HKG', 'MTR from Tsim Sha Tsui to Hong Kong Station, then Airport Express to the terminal. Allow 30 minutes for security re-entry.', 24, 0, 'Train', '115.00');

-- -------------------------------------------------------
-- Itineraries for DXB
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('dxb-3hr', 'DXB', 3, 'Dubai Mall & Burj Khalifa Exterior', 'Metro into downtown to see the world\'s tallest building up close and walk the massive Dubai Mall. Back before boarding.', 3),
('dxb-5hr', 'DXB', 5, 'Downtown Dubai & Fountain Show', 'Metro to Downtown Dubai for the Burj Khalifa observation deck, the Dubai Fountain, and lunch at the Mall.', 4),
('dxb-8hr', 'DXB', 8, 'Downtown & Jumeirah Beach', 'Full day — morning at the Burj Khalifa, lunch in Downtown, afternoon taxi to the beach and back before boarding.', 7);

-- Steps for dxb-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('dxb-3hr-1', 'dxb-3hr', 1, 'Clear immigration', 'Dubai immigration can move quickly but varies by flight patterns. Allow 25 minutes. Many nationalities receive visa-on-arrival or are visa-free — check before you exit.', 25, 10, 'Walk', NULL),
('dxb-3hr-2', 'dxb-3hr', 2, 'Metro Red Line to Burj Khalifa / Dubai Mall', 'Board the Red Line from Terminal 1 or Terminal 3 (the Terminals Metro station). About 30 minutes to the Burj Khalifa / Dubai Mall stop.', 30, 5, 'Metro', '8.00'),
('dxb-3hr-3', 'dxb-3hr', 3, 'Burj Khalifa exterior and fountain pool', 'The base of the Burj Khalifa and the fountain pool are free to visit. Walk around the full perimeter — the sheer scale is best understood from here. If the fountain is running (evenings), it\'s spectacular.', 30, 10, 'Walk', NULL),
('dxb-3hr-4', 'dxb-3hr', 4, 'Dubai Mall lower level', 'The mall has a large indoor aquarium and ice rink viewable for free from the walkways. If you\'re hungry, the ground-floor food court is fast and inexpensive by Dubai standards.', 25, 5, 'Walk', NULL),
('dxb-3hr-5', 'dxb-3hr', 5, 'Metro back to airport', 'Red Line back to the terminal. Allow 30 minutes for security re-entry. Note: Terminal 3 (Emirates) and Terminal 1/2 are separate buildings — confirm which terminal you depart from.', 30, 0, 'Metro', '8.00');

-- Steps for dxb-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('dxb-5hr-1', 'dxb-5hr', 1, 'Clear immigration', 'Allow 25 minutes. The metro station is a short walk from the arrivals hall — buy a NOL card at the machines, which are cheaper than single journey tickets.', 25, 10, 'Walk', NULL),
('dxb-5hr-2', 'dxb-5hr', 2, 'Metro Red Line to Downtown', 'Red Line from the Terminals station to Burj Khalifa / Dubai Mall. About 30 minutes. The elevated track gives good views of the city approaching downtown.', 30, 10, 'Walk', NULL),
('dxb-5hr-3', 'dxb-5hr', 3, 'Burj Khalifa observation deck — At the Top', 'Level 124 observation deck. Pre-booking online is significantly cheaper than same-day. The views stretch across the desert and Gulf on a clear day. Allow 45 minutes.', 45, 15, 'Walk', '200.00'),
('dxb-5hr-4', 'dxb-5hr', 4, 'Lunch in Dubai Mall', 'The mall\'s restaurant floor has everything from shawarma counters to sit-down seafood. The Lebanese and Levantine places on Level 2 are reliable and fast.', 55, 10, 'Walk', NULL),
('dxb-5hr-5', 'dxb-5hr', 5, 'Dubai Fountain boardwalk', 'The boardwalk around the fountain lake has great views of both the water and the Burj above. Shows run every 30 minutes from 6pm; the daytime water tests are also worth watching.', 25, 5, 'Walk', NULL),
('dxb-5hr-6', 'dxb-5hr', 6, 'Metro back to airport', 'Red Line back from Downtown. Allow 30 minutes for security re-entry at the terminal.', 30, 0, 'Metro', '8.00');

-- Steps for dxb-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('dxb-8hr-1', 'dxb-8hr', 1, 'Clear immigration', 'Allow 25 minutes. Buy a NOL card for the metro — it covers both metro legs of the day.', 25, 10, 'Walk', NULL),
('dxb-8hr-2', 'dxb-8hr', 2, 'Metro to Downtown Dubai', 'Red Line to Burj Khalifa / Dubai Mall, about 30 minutes.', 30, 10, 'Walk', NULL),
('dxb-8hr-3', 'dxb-8hr', 3, 'Burj Khalifa — At the Top', 'Pre-book Level 124. Come early — the crowd builds through the morning.', 50, 15, 'Walk', '200.00'),
('dxb-8hr-4', 'dxb-8hr', 4, 'Lunch in Downtown', 'The streets between the mall and the old town area (Souk Al Bahar) have outdoor seating with fountain views. Arabic mezze platters are the right call here.', 60, 20, 'Walk', NULL),
('dxb-8hr-5', 'dxb-8hr', 5, 'Taxi to Jumeirah Public Beach', 'Cab from Downtown to Jumeirah Beach (also called Kite Beach area). About 20 minutes. The public beach is free, has showers, and faces the Burj Al Arab.', 20, 5, 'Taxi', '35.00'),
('dxb-8hr-6', 'dxb-8hr', 6, 'Jumeirah Beach', 'Flat, clean beach with calm water. Walk the shoreline to the Burj Al Arab viewpoint. Kite Beach has food trucks and casual cafés along the waterfront.', 60, 5, 'Walk', NULL),
('dxb-8hr-7', 'dxb-8hr', 7, 'Return to airport by taxi', 'Cab back to the terminal — about 30 minutes. Allow 30 minutes for security re-entry.', 30, 0, 'Taxi', '40.00');

-- -------------------------------------------------------
-- Itineraries for AMS
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('ams-3hr', 'AMS', 3, 'Haarlem Quick Stop', 'Direct train to the charming Dutch city of Haarlem — medieval church, cobblestone streets, and a brown café for lunch. Closer than Amsterdam, just as Dutch.', 3),
('ams-5hr', 'AMS', 5, 'Amsterdam — Rijksmuseum & Vondelpark', 'Fast train to Amsterdam Centraal, walk to the Rijksmuseum, and wind down in Vondelpark with a coffee before heading back.', 4),
('ams-8hr', 'AMS', 8, 'Amsterdam — Jordaan & the Canals', 'Full city day — canal walk through the Jordaan, the Anne Frank House (book in advance), lunch in the Nine Streets, and a bike ride back to Centraal.', 7);

-- Steps for ams-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('ams-3hr-1', 'ams-3hr', 1, 'Clear customs', 'For Schengen-arriving passengers, re-entering is fast. For non-Schengen, allow 20 minutes through EU passport control.', 20, 5, 'Walk', NULL),
('ams-3hr-2', 'ams-3hr', 2, 'Train to Haarlem', 'Direct train from Schiphol to Haarlem. 20 minutes, runs every 15 minutes. Buy an OV-chipkaart or single ticket at the yellow NS machines.', 20, 5, 'Train', '4.90'),
('ams-3hr-3', 'ams-3hr', 3, 'Grote Markt and Sint-Bavokerk', 'The central market square is flanked by the massive Gothic Sint-Bavokerk church (Handel\'s organ is inside — free to enter the square, small admission for the church). Sit at a café terrace and watch the square.', 45, 10, 'Walk', NULL),
('ams-3hr-4', 'ams-3hr', 4, 'Lunch in the Jordaan-style alleys', 'The side streets off Grote Markt have classic Dutch brown cafés — dark wood, jenever on the shelf, and decent stamppot. Most open from noon.', 40, 10, 'Walk', NULL),
('ams-3hr-5', 'ams-3hr', 5, 'Return train to Schiphol', 'Train back to Schiphol, 20 minutes. Allow 30 minutes for security after arriving.', 20, 0, 'Train', '4.90');

-- Steps for ams-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('ams-5hr-1', 'ams-5hr', 1, 'Clear customs', 'Allow 20 minutes. The train station is directly below the terminal — no shuttle or taxi needed.', 20, 5, 'Walk', NULL),
('ams-5hr-2', 'ams-5hr', 2, 'Train to Amsterdam Centraal', 'Direct Intercity train from Schiphol, 17 minutes. Runs every 10 minutes.', 17, 15, 'Train', '4.90'),
('ams-5hr-3', 'ams-5hr', 3, 'Rijksmuseum', 'The national museum of the Netherlands. Rembrandt, Vermeer, and Delft pottery in an enormous 19th-century building. Allow 75 minutes for a focused visit — don\'t try to see everything. Book tickets online to skip the queue.', 75, 15, 'Walk', '22.50'),
('ams-5hr-4', 'ams-5hr', 4, 'Vondelpark', 'Amsterdam\'s central park is right behind the Rijksmuseum. Grab a coffee from the Blauwe Theehuis (Blue Tea House) in the middle of the park and sit by the pond.', 35, 15, 'Walk', NULL),
('ams-5hr-5', 'ams-5hr', 5, 'Return train to Schiphol', 'Walk back through the museum quarter to the Centraal or Lelylaan station and take the train to the airport. Allow 30 minutes for security.', 17, 0, 'Train', '4.90');

-- Steps for ams-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('ams-8hr-1', 'ams-8hr', 1, 'Clear customs', 'Allow 20 minutes. The platform is directly under the departures hall — follow signs to "Trein / Train."', 20, 5, 'Walk', NULL),
('ams-8hr-2', 'ams-8hr', 2, 'Train to Amsterdam Centraal', 'Direct Intercity, 17 minutes.', 17, 15, 'Train', '4.90'),
('ams-8hr-3', 'ams-8hr', 3, 'Anne Frank House', 'The house where Anne Frank and her family hid during the German occupation. Book tickets well in advance — timed entry, limited availability. The audio guide is excellent. Allow 75 minutes.', 75, 10, 'Walk', '14.00'),
('ams-8hr-4', 'ams-8hr', 4, 'Jordaan canal walk', 'The Jordaan district west of the Prinsengracht is Amsterdam\'s most atmospheric neighborhood. Walk the canal bridges, browse art galleries, and stop at a cheese shop on the Noordermarkt if it\'s Saturday.', 50, 10, 'Walk', NULL),
('ams-8hr-5', 'ams-8hr', 5, 'Lunch in the Nine Streets (De Negen Straatjes)', 'The grid of specialty shops and restaurants between the main canals. Good for sandwiches, Indonesian rijsttafel, or a sitting lunch at one of the narrow canal-side restaurants.', 60, 15, 'Walk', NULL),
('ams-8hr-6', 'ams-8hr', 6, 'Bike ride or walk back to Centraal', 'Rental bikes are everywhere — a 20-minute ride through the city back to Centraal along the Herengracht is a genuine Amsterdam experience. MacBike has pickup near the Nine Streets.', 25, 5, 'Bike', '12.00'),
('ams-8hr-7', 'ams-8hr', 7, 'Return train to Schiphol', 'Intercity from Centraal to Schiphol. Allow 30 minutes for security.', 17, 0, 'Train', '4.90');

-- -------------------------------------------------------
-- Itineraries for LHR
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('lhr-3hr', 'LHR', 3, 'Windsor Castle Town', 'Train or bus to Windsor for a walk around the castle walls, the Long Walk through Windsor Great Park, and a quick pub lunch on the high street.', 3),
('lhr-5hr', 'LHR', 5, 'Kensington & Hyde Park', 'Piccadilly line into central London for the free Natural History Museum or V&A, a walk through Hyde Park, and lunch in South Kensington.', 5),
('lhr-8hr', 'LHR', 8, 'Westminster & Borough Market', 'Full London day — Big Ben, Westminster Bridge, walk along the South Bank, and lunch at Borough Market before the Jubilee line back to Heathrow.', 7);

-- Steps for lhr-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('lhr-3hr-1', 'lhr-3hr', 1, 'Clear customs', 'UK immigration can be slow — allow a full 30 minutes. Non-EEA passports queue separately from eGate users. This is the biggest variable in your timing.', 30, 10, 'Walk', NULL),
('lhr-3hr-2', 'lhr-3hr', 2, 'Bus 77 to Windsor', 'The 77 bus runs from Terminal 5 forecourt directly to Windsor town centre, about 35 minutes. Alternately, take the Elizabeth line to Slough (20 min), then GWR train to Windsor & Eton Central (5 min).', 35, 5, 'Bus', '4.00'),
('lhr-3hr-3', 'lhr-3hr', 3, 'Windsor Castle exterior and Long Walk', 'The castle exterior and the famous Long Walk through Windsor Great Park are free to walk. The castle itself requires tickets (about £28) — on a 3hr layover, stick to the exterior and the view from the park.', 40, 10, 'Walk', NULL),
('lhr-3hr-4', 'lhr-3hr', 4, 'Pub lunch on Windsor high street', 'The Two Brewers or the Horse and Groom are reliable old pubs on the main shopping street. Quick pie or fish and chips.', 30, 5, 'Walk', NULL),
('lhr-3hr-5', 'lhr-3hr', 5, 'Return to airport', 'Bus 77 back to T5 or the train/Elizabeth line route in reverse. Allow 45 minutes for UK security re-entry — the queues vary and can be long.', 35, 0, 'Bus', '4.00');

-- Steps for lhr-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('lhr-5hr-1', 'lhr-5hr', 1, 'Clear customs', 'Allow 30 minutes through UK immigration. Plan conservatively — queues vary sharply by flight pattern.', 30, 10, 'Walk', NULL),
('lhr-5hr-2', 'lhr-5hr', 2, 'Piccadilly line to South Kensington', 'Direct from any Heathrow terminal to South Kensington, about 45 minutes. Buy an Oyster card or use contactless — the paper ticket is more expensive.', 45, 10, 'Underground', '6.00'),
('lhr-5hr-3', 'lhr-5hr', 3, 'Natural History Museum or V&A', 'Both are free, world-class, and a 2-minute walk from South Kensington station. The Natural History Museum\'s main hall alone is worth seeing. The V&A has one of the best design and decorative arts collections anywhere.', 70, 10, 'Walk', NULL),
('lhr-5hr-4', 'lhr-5hr', 4, 'Hyde Park walk', 'Cut through Hyde Park from the museum quarter toward the Serpentine lake. The park is enormous — just walk as far as time allows and turn around.', 35, 10, 'Walk', NULL),
('lhr-5hr-5', 'lhr-5hr', 5, 'Lunch in South Kensington', 'The old Brompton Road and Thurloe Street have sandwich shops, Italian delis, and sit-down cafés all within two minutes of the station.', 40, 5, 'Walk', NULL),
('lhr-5hr-6', 'lhr-5hr', 6, 'Piccadilly line back to Heathrow', 'Return from South Kensington. Allow 45 minutes for security re-entry — LHR queues are unpredictable.', 45, 0, 'Underground', '6.00');

-- Steps for lhr-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('lhr-8hr-1', 'lhr-8hr', 1, 'Clear customs', 'Allow 30 minutes. Use contactless payment on the Tube — fastest option.', 30, 10, 'Walk', NULL),
('lhr-8hr-2', 'lhr-8hr', 2, 'Jubilee line to Westminster', 'Piccadilly line to Green Park, transfer to Jubilee line one stop to Westminster. About 55 minutes total.', 55, 10, 'Underground', '6.00'),
('lhr-8hr-3', 'lhr-8hr', 3, 'Westminster Bridge and Parliament', 'The view from Westminster Bridge — Big Ben, the Houses of Parliament, and the Thames — is one of the classic London sights. Free from the bridge. Walk south across the river to the South Bank.', 30, 15, 'Walk', NULL),
('lhr-8hr-4', 'lhr-8hr', 4, 'South Bank walk to Borough Market', 'The riverside path runs east past the Tate Modern and Shakespeare\'s Globe to Borough Market. About 30 minutes of walking with constant river views.', 35, 10, 'Walk', NULL),
('lhr-8hr-5', 'lhr-8hr', 5, 'Borough Market lunch', 'One of the oldest and best food markets in London. Sample cheese, charcuterie, pies, and fresh bread from the stalls. Go early — it gets crowded by noon. Open Wednesdays–Saturdays.', 60, 10, 'Walk', NULL),
('lhr-8hr-6', 'lhr-8hr', 6, 'Jubilee line back to Heathrow', 'London Bridge station is directly adjacent to Borough Market. Jubilee line to Green Park, then Piccadilly line to Heathrow. Allow 45 minutes for security re-entry.', 55, 0, 'Underground', '6.00');

-- -------------------------------------------------------
-- Itineraries for CDG
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('cdg-3hr', 'CDG', 3, 'Saint-Denis Basilica', 'RER B to the royal necropolis of France — the Gothic basilica where every French king from Clovis to Louis XVIII is buried. 15 minutes from the airport.', 3),
('cdg-5hr', 'CDG', 5, 'Montmartre', 'RER B and metro to Paris\'s hilltop village neighborhood — Sacré-Cœur, the artists\' square, and lunch before the train back.', 4),
('cdg-8hr', 'CDG', 8, 'Eiffel Tower & Seine Walk', 'Full Paris day — RER B to the Eiffel Tower, walk the Trocadéro, lunch near the Champ de Mars, and a stroll along the Seine before heading back.', 7);

-- Steps for cdg-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('cdg-3hr-1', 'cdg-3hr', 1, 'Clear customs', 'Allow 25 minutes through French immigration. Non-Schengen queues can take longer at peak times.', 25, 10, 'Walk', NULL),
('cdg-3hr-2', 'cdg-3hr', 2, 'RER B to La Plaine–Stade de France', 'The RER B runs from CDG terminals to Paris. For Saint-Denis, exit at La Plaine–Stade de France, about 15 minutes from T2.', 15, 10, 'RER', '5.90'),
('cdg-3hr-3', 'cdg-3hr', 3, 'Basilique Saint-Denis', 'The first major Gothic church ever built and the burial site of almost every French monarch. The nave is free; the royal tombs in the crypt require a ticket. Even the free areas — the nave, the ambulatory, and the funerary sculptures — are extraordinary.', 50, 10, 'Walk', '8.00'),
('cdg-3hr-4', 'cdg-3hr', 4, 'Coffee on the Place Victor Hugo', 'The square in front of the basilica has a few café terraces. Quick espresso before the return.', 20, 5, 'Walk', NULL),
('cdg-3hr-5', 'cdg-3hr', 5, 'RER B back to CDG', 'Direct RER B back to the terminal. Allow 45 minutes for re-entry and security at CDG — the queues in T2 can be very long.', 15, 0, 'RER', '5.90');

-- Steps for cdg-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('cdg-5hr-1', 'cdg-5hr', 1, 'Clear customs', 'Allow 25 minutes. Follow signs to the RER B platform inside the terminal.', 25, 5, 'Walk', NULL),
('cdg-5hr-2', 'cdg-5hr', 2, 'RER B to Gare du Nord, then Metro to Abbesses', 'RER B to Gare du Nord (~30 min), then Metro Line 12 three stops to Abbesses station in Montmartre. Abbesses is the deepest station in Paris — take the spiral staircase, not the lift.', 40, 10, 'RER + Metro', '11.80'),
('cdg-5hr-3', 'cdg-5hr', 3, 'Sacré-Cœur Basilica', 'Walk up the steps from Abbesses to the white domed basilica at the top of the butte. The view over Paris from the steps is free and excellent. The interior is ornate Byzantine — free entry.', 35, 15, 'Walk', NULL),
('cdg-5hr-4', 'cdg-5hr', 4, 'Place du Tertre artists\' square', 'The cobblestone square behind Sacré-Cœur is ringed by portrait painters. It\'s touristy but genuinely picturesque. Walk the narrow streets radiating out — Rue Lepic has a proper market and boulangeries.', 30, 10, 'Walk', NULL),
('cdg-5hr-5', 'cdg-5hr', 5, 'Lunch on Rue des Abbesses', 'The street below the Sacré-Cœur has crêpe stands, wine bars, and sit-down bistros. Budget €12–18 for a set lunch formule.', 50, 10, 'Walk', NULL),
('cdg-5hr-6', 'cdg-5hr', 6, 'RER B back to CDG', 'Metro to Gare du Nord, then RER B to the airport. Allow 45 minutes for security re-entry.', 40, 0, 'Metro + RER', '11.80');

-- Steps for cdg-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('cdg-8hr-1', 'cdg-8hr', 1, 'Clear customs', 'Allow 25 minutes. The RER B platform is directly in the terminal building.', 25, 5, 'Walk', NULL),
('cdg-8hr-2', 'cdg-8hr', 2, 'RER B to Châtelet–Les Halles, then RER C to Champ de Mars', 'RER B to Châtelet (~35 min), transfer to RER C westbound to Champ de Mars–Tour Eiffel (~15 min). Total about 55 minutes from the airport.', 55, 10, 'RER', '11.80'),
('cdg-8hr-3', 'cdg-8hr', 3, 'Eiffel Tower and Trocadéro', 'Walk up to the Trocadéro esplanade for the full frontal view of the tower — the best angle, and free. Then walk down to the tower itself. If you\'re going up, book tickets online in advance; the queues for same-day tickets are brutal.', 60, 15, 'Walk', NULL),
('cdg-8hr-4', 'cdg-8hr', 4, 'Lunch near Champ de Mars', 'The streets south of the tower on Rue Cler and Rue de Grenelle are some of the best in Paris for a sit-down lunch — classic bistros, fromageries, and charcuterie counters. Allow an hour.', 60, 15, 'Walk', NULL),
('cdg-8hr-5', 'cdg-8hr', 5, 'Walk along the Seine to the Louvre', 'Follow the river east on the Quai Branly path. Cross at Pont des Arts (the lock bridge) and walk through the Tuileries garden to the Louvre pyramid. Just the exterior and the garden take 45 minutes.', 50, 10, 'Walk', NULL),
('cdg-8hr-6', 'cdg-8hr', 6, 'RER B back to CDG', 'RER from Châtelet–Les Halles or Saint-Michel back to the airport. Allow 45 minutes for security re-entry.', 35, 0, 'RER', '11.80');

-- -------------------------------------------------------
-- Itineraries for SYD
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('syd-3hr', 'SYD', 3, 'Bondi Beach', 'Train and bus to Sydney\'s most iconic beach. An hour on the sand, then the cliff walk toward Coogee before heading back.', 3),
('syd-5hr', 'SYD', 5, 'Circular Quay & the Opera House', 'Train to the city for the Sydney Opera House exterior, a walk along the harbour to the Rocks, and lunch at Circular Quay.', 4),
('syd-8hr', 'SYD', 8, 'Opera House, Botanic Gardens & Darling Harbour', 'Full Sydney day — the harbour, the botanic gardens, lunch in the CBD, and a walk through Darling Harbour before heading back.', 7);

-- Steps for syd-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('syd-3hr-1', 'syd-3hr', 1, 'Clear customs and biosecurity', 'Australia\'s biosecurity checks are thorough — declare all food, plant, and animal products or they will be found. Allow 40 minutes for customs, biosecurity, and bag collection.', 40, 5, 'Walk', NULL),
('syd-3hr-2', 'syd-3hr', 2, 'Train to Bondi Junction, then bus to Bondi Beach', 'Airport Link to Bondi Junction (20 min), then Bus 380 or 333 to Bondi Beach (10 min). Buy an Opal card at the machines in the terminal — much cheaper than single tickets.', 30, 5, 'Train + Bus', '5.18'),
('syd-3hr-3', 'syd-3hr', 3, 'Bondi Beach', 'Walk the full length of the beach. Swim if conditions are right and a lifeguard is on the flags. The south end of the beach and the start of the coastal walk are less crowded.', 40, 10, 'Walk', NULL),
('syd-3hr-4', 'syd-3hr', 4, 'Start of the Bondi to Coogee coastal walk', 'The cliff path starts at the south end of the beach. Even 15 minutes along gives great views back over Bondi and the Pacific. Turn around at the first headland.', 20, 10, 'Walk', NULL),
('syd-3hr-5', 'syd-3hr', 5, 'Return to airport', 'Bus back to Bondi Junction, then Airport Link to SYD. Allow 45 minutes for security — international departures at Sydney take longer than domestic.', 30, 0, 'Bus + Train', '5.18');

-- Steps for syd-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('syd-5hr-1', 'syd-5hr', 1, 'Clear customs and biosecurity', 'Allow 40 minutes including biosecurity checks. Buy an Opal card at the airport before boarding the train.', 40, 5, 'Walk', NULL),
('syd-5hr-2', 'syd-5hr', 2, 'Airport Link to Circular Quay', 'Direct train from the airport to Circular Quay station, about 15 minutes.', 15, 10, 'Train', '5.18'),
('syd-5hr-3', 'syd-5hr', 3, 'Sydney Opera House', 'Walk around the full exterior of the Opera House on the Bennelong Point promenade. The building is best seen close up — the tile detail and the sail shells are extraordinary. A guided tour (45 min, ~$45) goes inside; the exterior is free.', 40, 10, 'Walk', NULL),
('syd-5hr-4', 'syd-5hr', 4, 'Harbour walk to the Rocks', 'Walk west along the harbour foreshore past the ferry wharves to the Rocks — Sydney\'s oldest neighborhood, with sandstone warehouses and cobblestone lanes.', 30, 10, 'Walk', NULL),
('syd-5hr-5', 'syd-5hr', 5, 'Lunch at Circular Quay', 'Several good restaurants along the quay with harbour views. The Rocks area behind it has better value — Sailors Thai and the Glenmore Hotel rooftop are reliable.', 55, 5, 'Walk', NULL),
('syd-5hr-6', 'syd-5hr', 6, 'Return to airport', 'Airport Link train from Circular Quay. Allow 45 minutes for international security and check-in.', 15, 0, 'Train', '5.18');

-- Steps for syd-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('syd-8hr-1', 'syd-8hr', 1, 'Clear customs and biosecurity', 'Allow 40 minutes. Opal card is the right payment method — get one at the machines before boarding.', 40, 5, 'Walk', NULL),
('syd-8hr-2', 'syd-8hr', 2, 'Airport Link to Circular Quay', 'Direct 15-minute train to the harbour.', 15, 10, 'Train', '5.18'),
('syd-8hr-3', 'syd-8hr', 3, 'Opera House and Mrs Macquaries Chair', 'Walk the Opera House exterior, then continue east along the Domain foreshore path to Mrs Macquaries Chair — the headland with the famous unobstructed view of the Opera House and Harbour Bridge together.', 50, 15, 'Walk', NULL),
('syd-8hr-4', 'syd-8hr', 4, 'Royal Botanic Gardens', 'Walk back through the botanic gardens along the harbour edge. Free entry. The rose garden, fig tree avenue, and the views of the bridge from the water\'s edge are all good.', 45, 15, 'Walk', NULL),
('syd-8hr-5', 'syd-8hr', 5, 'Lunch in the CBD', 'Walk up from the gardens to Martin Place or the CBD food courts. World Square food court on George Street has fast, cheap, and diverse options.', 55, 15, 'Walk', NULL),
('syd-8hr-6', 'syd-8hr', 6, 'Darling Harbour waterfront', 'Walk west from the CBD to Darling Harbour — the old dock area with a pedestrian waterfront, the Australian National Maritime Museum, and good views of the city skyline.', 45, 10, 'Walk', NULL),
('syd-8hr-7', 'syd-8hr', 7, 'Return to airport', 'Train from Town Hall or Central back to the airport. Allow 45 minutes for international security.', 15, 0, 'Train', '5.18');

-- -------------------------------------------------------
-- Itineraries for FRA
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('fra-3hr', 'FRA', 3, 'Frankfurt Römerberg Old Town', 'S-Bahn into the heart of Frankfurt for the medieval market square, the half-timbered Römer town hall, and a quick stop for Apfelwein.', 3),
('fra-5hr', 'FRA', 5, 'Frankfurt Museums & Sachsenhausen', 'Train into the city for the Museum Embankment (multiple world-class free-entry museums), a walk across the Eiserner Steg bridge, and lunch in the Sachsenhausen Apfelwein district.', 4),
('fra-8hr', 'FRA', 8, 'Frankfurt Full Day — Old Town to Bockenheim', 'A leisurely loop from the old town to Sachsenhausen, through the banking district, and into the quieter Bockenheim neighborhood for dinner before the S-Bahn back.', 7);

-- Steps for fra-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('fra-3hr-1', 'fra-3hr', 1, 'Clear customs', 'Schengen arrivals are fast; non-Schengen can take 20 minutes. Follow signs to the S-Bahn platform inside the terminal.', 20, 5, 'Walk', NULL),
('fra-3hr-2', 'fra-3hr', 2, 'S-Bahn to Frankfurt Hauptbahnhof', 'S8 or S9 from the Frankfurt Airport Fernbahnhof or Regionalbahnhof platforms. 11 minutes to the main station. Runs every 15 minutes.', 11, 10, 'S-Bahn', '5.50'),
('fra-3hr-3', 'fra-3hr', 3, 'Walk to Römerberg', 'From the Hauptbahnhof, it\'s a 15-minute walk east along Kaiserstrasse and into the old town, or take U4/U5 one stop to Dom/Römer.', 15, 5, 'Walk', NULL),
('fra-3hr-4', 'fra-3hr', 4, 'Römerberg market square', 'The reconstructed medieval square with its half-timbered buildings and Römer town hall façade. The Ostzeile row of houses, the Gerechtigkeitsbrunnen fountain, and the square itself can be walked in 20 minutes. Free entry to the square.', 30, 10, 'Walk', NULL),
('fra-3hr-5', 'fra-3hr', 5, 'Apfelwein at a Sachsenhausen stand', 'A five-minute walk south of Römerberg is the Sachsenhausen embankment, where you can get a glass of Frankfurt\'s tart apple wine (Apfelwein) at a street kiosk or traditional Weinstube.', 20, 10, 'Walk', NULL),
('fra-3hr-6', 'fra-3hr', 6, 'S-Bahn back to airport', 'S8/S9 from Frankfurt Hbf back to the airport. Allow 30 minutes for security re-entry at FRA.', 11, 0, 'S-Bahn', '5.50');

-- Steps for fra-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('fra-5hr-1', 'fra-5hr', 1, 'Clear customs', 'Allow 20 minutes. S-Bahn platforms are downstairs in the terminal.', 20, 5, 'Walk', NULL),
('fra-5hr-2', 'fra-5hr', 2, 'S-Bahn to Frankfurt city', 'S8 or S9 to Hauptbahnhof, then U4/U5 one stop to Willy-Brandt-Platz or Römer. About 20 minutes total.', 20, 5, 'S-Bahn', '5.50'),
('fra-5hr-3', 'fra-5hr', 3, 'Schirn Kunsthalle or Städel Museum', 'Frankfurt\'s Museumsufer (Museum Embankment) on the south bank has over a dozen museums within walking distance. The Städel is one of Germany\'s best art museums (€18); the Schirn has free entry to many exhibitions.', 75, 10, 'Walk', '18.00'),
('fra-5hr-4', 'fra-5hr', 4, 'Eiserner Steg pedestrian bridge', 'The iron footbridge across the Main river is lined with padlocks (like Cologne\'s bridge) and offers good views of the skyline and Sachsenhausen riverfront.', 20, 10, 'Walk', NULL),
('fra-5hr-5', 'fra-5hr', 5, 'Lunch in Sachsenhausen', 'The Apfelwein district south of the river has traditional Frankfurt restaurants serving Grüne Soße (green herb sauce), Handkäse mit Musik, and Schnitzel. Zum Gemalten Haus and Wagner are both old-school and good.', 60, 10, 'Walk', NULL),
('fra-5hr-6', 'fra-5hr', 6, 'S-Bahn back to airport', 'S-Bahn from Konstablerwache or Hauptbahnhof. Allow 30 minutes for security re-entry.', 11, 0, 'S-Bahn', '5.50');

-- Steps for fra-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('fra-8hr-1', 'fra-8hr', 1, 'Clear customs', 'Allow 20 minutes. S8/S9 platforms are signed from baggage claim.', 20, 5, 'Walk', NULL),
('fra-8hr-2', 'fra-8hr', 2, 'S-Bahn to Frankfurt', 'S8 or S9 to Hauptbahnhof, 11 minutes.', 11, 10, 'S-Bahn', '5.50'),
('fra-8hr-3', 'fra-8hr', 3, 'Römerberg and Dom (Cathedral)', 'Walk through the Römerberg square and into the adjacent Frankfurt Cathedral (Dom). Free to enter the nave; small fee for the tower. The Dom is one of the few genuinely old buildings in a city heavily rebuilt after WWII.', 45, 15, 'Walk', NULL),
('fra-8hr-4', 'fra-8hr', 4, 'Städel Museum', 'One of Germany\'s top art museums — Rembrandt, Vermeer, Botticelli, and a strong contemporary collection in the subterranean extension. Take 75–90 minutes for the highlights.', 80, 15, 'Walk', '18.00'),
('fra-8hr-5', 'fra-8hr', 5, 'Lunch in Sachsenhausen', 'Traditional Frankfurt pub food south of the Main. Order Handkäse with onions and vinegar (it\'s an acquired taste), Grüne Soße over boiled eggs, and a Apfelwein in a Bembel jug.', 65, 15, 'Walk', NULL),
('fra-8hr-6', 'fra-8hr', 6, 'Walk through the banking district', 'The Bankenviertel north of the river has Frankfurt\'s cluster of skyscrapers — unusual for a European city of this size. The Zeil pedestrian shopping street and the Kleinmarkthalle covered market are both nearby.', 40, 15, 'Walk', NULL),
('fra-8hr-7', 'fra-8hr', 7, 'S-Bahn back to airport', 'S8/S9 from Hauptbahnhof. Allow 30 minutes for security re-entry.', 11, 0, 'S-Bahn', '5.50');

-- -------------------------------------------------------
-- Logistics for 10 new airports
-- -------------------------------------------------------

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'SIN',
'Singapore is visa-free for most nationalities for stays up to 30 days. Some nationalities require a visa — check with the ICA (Immigration & Checkpoints Authority) before exiting the terminal. Transit through Changi without clearing immigration is always unrestricted.',
'iStorage operates counters in Terminals 1, 2, and 3. Rates start from SGD $6 per hour. Coin-operated lockers are also available near the departure halls. Changi also has a free airport hotel for long transits — check the website if your layover exceeds 5 hours.',
'Allow 30 minutes for security re-entry at Changi. Singapore immigration is fast and the terminal is efficient. Have your boarding pass and passport ready at the automated lanes. Most major passport holders clear in under 15 minutes.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'NRT',
'Japan operates a visa-waiver program for many nationalities (US, EU, Canada, Australia, and others) for stays up to 90 days. Some nationalities require a transit visa even without leaving the airport — check with the Ministry of Foreign Affairs Japan (MOFA) website for your passport country before exiting.',
'Coin lockers are available throughout T1 and T2 in various sizes (¥500–¥1,000 per day). Staffed luggage storage counters are located in the arrivals halls of both terminals. Oversized bags must use the staffed counter.',
'Allow 45 minutes for customs and security when returning to Narita. Queues at the international re-entry counters can be long, especially during peak travel periods and major holiday windows in Japan. Have your onward boarding pass ready for immigration.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'ICN',
'South Korea has a 90-day visa-waiver for most Western and many Asian nationalities. Transit passengers staying airside do not require a visa. If exiting to the city, check your eligibility at the KDIS (Korea Immigration Service) website. Some nationalities require a K-ETA (Electronic Travel Authorization) even for visa-free entry.',
'Baggage storage counters are located in T1 (Level 1 near Gate 5) and T2 (B1 level near Gate 230). Rates start from ₩4,000 per hour or ₩9,000 per day. Coin-operated lockers are also available airside and in the arrivals halls.',
'Allow 30 minutes for re-entry at Incheon. Both T1 and T2 immigration is fast by international standards. T2 in particular moves quickly. Use the automated e-gates if your passport is eligible — significantly faster than the staffed counters.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'HKG',
'Hong Kong has one of the most permissive visa-free policies in the world — most Western, Asian, and Commonwealth passport holders can enter for 90 days without a visa. Mainland China nationals require a separate permit. Check the IMMD (Immigration Department) Hong Kong for current eligibility.',
'Left-luggage counters are available in the arrivals hall and in the transfer area. Rates start from HKD $30 per hour or $180 per day. The airport also has day rooms and shower facilities for long layovers.',
'Allow 30 minutes for re-entry and security. Hong Kong immigration is generally fast. Have your return boarding pass ready for the immigration officer, as you will be asked to show it. The security queues are usually short even during peak periods.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'DXB',
'The UAE grants visa-on-arrival or visa-free entry to many nationalities including USA, EU, UK, Canada, and Australia — typically 30 or 90 days depending on passport. Some nationalities require a pre-arranged UAE visa. Check with the ICA UAE (Federal Authority for Identity and Citizenship) before exiting the terminal. Transit without leaving the secure zone is always unrestricted.',
'Left-luggage facilities are available at T1 and T3 arrivals, operated by dnata. Rates from AED 25 per item per day. Lockers are not widely available, so use the staffed counter.',
'Allow 30 minutes for security re-entry at Dubai Airport. Note that T1/T2 and T3 (Emirates) are separate buildings connected by a bus — confirm your departure terminal before heading back. The Metro does not serve all terminals equally. Budget extra time to walk between the Metro station and your gate.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'AMS',
'Schengen rules apply at Amsterdam Schiphol. Nationals of many countries (USA, Canada, Australia, Japan, and most of the Americas) can enter visa-free for up to 90 days within a 180-day period. Some nationalities require a Schengen visa. Check the Netherlandsthe IND (Immigration and Naturalisation Service) website or the Schengen visa portal for your passport.',
'GreenLocker and Stow Your Bags operate at Schiphol. Staffed luggage storage is near Arrivals, Plaza level. Rates from approximately €10 per item for up to 4 hours. Coin lockers are available in the terminal for small bags.',
'Allow 30 minutes for security re-entry at Schiphol. EU/EEA passport holders use fast-track e-gates; non-EU queues can take longer during peak periods. The train station is directly under the terminal — no shuttle required, which saves significant time compared to other major European airports.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'LHR',
'The UK has its own immigration rules separate from Schengen. Most nationalities now require an Electronic Travel Authorisation (ETA) for visa-free entry — including USA, Canada, Australia, and EU nationals. Check the UKVI (UK Visas and Immigration) website and apply in advance if required. Some nationalities require a Standard Visitor Visa, which must be arranged before travel.',
'Excess Baggage Company operates left-luggage counters in all four terminals. Rates from £10 per item for up to 2 hours. Coin lockers are available in T2, T3, and T5.',
'Allow a full 45–60 minutes for re-entry at Heathrow. LHR immigration is notoriously variable — queues can range from 10 minutes to over an hour depending on how many wide-body aircraft have just arrived. Non-eGate passport holders queue separately. Plan very conservatively for your return time.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'CDG',
'Schengen rules apply at Paris Charles de Gaulle. Nationals of the USA, Canada, Australia, and most of the Americas and Asia-Pacific can enter visa-free for up to 90 days. Some nationalities require a Schengen visa issued in advance. Check the France Visas website for current requirements.',
'Left luggage (consigne à bagages) is available at T1, each hall of T2, and T3. Rates from approximately €12 per item for 24 hours. The counters are staffed and open during normal airport operating hours.',
'Allow 45 minutes for re-entry and security at CDG. Terminal 2 immigration queues can be very long, especially when multiple long-haul flights arrive simultaneously. The RER B runs direct to the terminals — no need for a taxi for the return. Keep your return boarding pass and passport accessible.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'SYD',
'Australia requires all visitors to hold a valid visa or ETA (Electronic Travel Authority) before arrival — there is no visa-on-arrival program. Most Western passport holders (USA, UK, Canada, EU, Japan) qualify for the ETA, which costs AUD $20 and must be applied for online before travel. Do not exit immigration until you have confirmed your visa eligibility.',
'Left luggage is available at T1 (International) on the arrivals level. Rates from AUD $10 per item for up to 6 hours. The service is staffed.',
'Allow a minimum of 45 minutes for re-entry at Sydney International. Australian biosecurity inspections are thorough and mandatory — all food, plant material, and animal products must be declared. Failure to declare items is a significant fine. The queue for international security and passport control on return adds additional time beyond a standard domestic airport experience.');

-- -------------------------------------------------------
-- Itineraries for BNA
-- -------------------------------------------------------

INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours) VALUES
('bna-3hr', 'BNA', 3, 'Broadway Quick Stop', 'Uber to Lower Broadway, step into a honky-tonk, grab hot chicken, and head back before boarding.', 3),
('bna-5hr', 'BNA', 5, 'Broadway & the Gulch', 'A wider loop through downtown — the honky-tonk strip, the Gulch neighborhood murals, and a sit-down lunch before the Uber back.', 4),
('bna-8hr', 'BNA', 8, 'Full Nashville Day', 'The whole picture — Broadway, the Ryman, the Country Music Hall of Fame, hot chicken, and Centennial Park.', 7);

-- Steps for bna-3hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('bna-3hr-1', 'bna-3hr', 1, 'Exit terminal', 'Domestic arrivals walk straight out; international travelers clear customs first. BNA is compact — baggage claim to the curb takes under 10 minutes.', 10, 5, 'Walk', NULL),
('bna-3hr-2', 'bna-3hr', 2, 'Uber/Lyft to Lower Broadway', 'No direct rail from BNA. Ride-share is the move — about 15–20 minutes to downtown. Pickup from the ground transportation area on the lower level.', 20, 5, 'Uber/Lyft', '22.00'),
('bna-3hr-3', 'bna-3hr', 3, 'Lower Broadway honky-tonks', 'The strip between 2nd and 5th Ave is wall-to-wall live music bars, all free to enter. Robert''s Western World is the real deal — Merle Haggard and Bob Wills on the jukebox when the band takes a break.', 45, 10, 'Walk', NULL),
('bna-3hr-4', 'bna-3hr', 4, 'Hot chicken at Hattie B''s', 'The Broadway location is tourist-convenient. Order at the counter, grab a table, and get it at least "medium." The Bird biscuit is the move if you''re not that hungry.', 35, 5, 'Walk', NULL),
('bna-3hr-5', 'bna-3hr', 5, 'Return to airport', 'Request the Uber from Broadway — pickup is easy from 1st Ave along the riverfront. Allow 30 minutes for TSA on return.', 20, 0, 'Uber/Lyft', '22.00');

-- Steps for bna-5hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('bna-5hr-1', 'bna-5hr', 1, 'Exit terminal', 'Walk to the ground transportation area on the lower level. Request the Uber before you reach the curb.', 10, 5, 'Walk', NULL),
('bna-5hr-2', 'bna-5hr', 2, 'Uber/Lyft to Lower Broadway', 'About 20 minutes depending on traffic. Drop-off anywhere on Broadway.', 20, 5, 'Uber/Lyft', '22.00'),
('bna-5hr-3', 'bna-5hr', 3, 'Lower Broadway', 'Walk the full strip — the neon, the mechanical bulls, the boot shops, and the live bands. Go inside a few places. Tootsie''s Orchid Lounge, Legends Corner, and Robert''s Western World all have long histories worth knowing.', 45, 10, 'Walk', NULL),
('bna-5hr-4', 'bna-5hr', 4, 'Walk to the Gulch', 'Head southwest about 15 minutes on foot to the Gulch — Nashville''s old rail yard turned trendy district. The "What Lifts You" angel wings mural on the side of a building is the most-photographed thing in Nashville.', 20, 5, 'Walk', NULL),
('bna-5hr-5', 'bna-5hr', 5, 'The Gulch neighborhood', 'A compact grid of brunch spots, wine bars, and independent shops. Walk the full block and pick somewhere to eat — the area has good options at every price point.', 30, 5, 'Walk', NULL),
('bna-5hr-6', 'bna-5hr', 6, 'Lunch in the Gulch', 'Biscuit Love is the local institution for brunch. Bastion is excellent if it''s open for lunch. Plenty of fast-casual options if you''d rather keep moving.', 55, 10, 'Walk', NULL),
('bna-5hr-7', 'bna-5hr', 7, 'Return to airport', 'Easy Uber pickup from the Gulch. Allow 30 minutes for TSA on return.', 20, 0, 'Uber/Lyft', '22.00');

-- Steps for bna-8hr

INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost) VALUES
('bna-8hr-1', 'bna-8hr', 1, 'Exit terminal', 'Walk to ground transportation on the lower level. Request the Uber on your way down.', 10, 5, 'Walk', NULL),
('bna-8hr-2', 'bna-8hr', 2, 'Uber/Lyft to downtown', 'Drop off on Broadway or near the Ryman.', 20, 10, 'Uber/Lyft', '22.00'),
('bna-8hr-3', 'bna-8hr', 3, 'Lower Broadway', 'Start the day on the strip before the crowds arrive. The honky-tonks are open early and the bands start around 10am. Robert''s Western World opens for breakfast.', 40, 10, 'Walk', NULL),
('bna-8hr-4', 'bna-8hr', 4, 'Ryman Auditorium', 'The "Mother Church of Country Music" — the original home of the Grand Ole Opry from 1943 to 1974. The daytime self-guided tour lets you stand on the stage. About 30–40 minutes.', 40, 10, 'Walk', '30.00'),
('bna-8hr-5', 'bna-8hr', 5, 'Country Music Hall of Fame', 'The definitive museum of American roots music — not just country. Strong exhibits on Elvis, Ray Charles, and the Nashville Sound. Allow 90 minutes to do it properly. Pre-book tickets online.', 90, 15, 'Walk', '32.00'),
('bna-8hr-6', 'bna-8hr', 6, 'Walk Music Row', 'Head up 16th and 17th Ave through the old publishing and recording district. Historic studios, a few plaques, and the BMI and ASCAP buildings — unremarkable to look at but significant if you know the music.', 25, 15, 'Walk', NULL),
('bna-8hr-7', 'bna-8hr', 7, 'Hot chicken at Hattie B''s (19th Ave original)', 'The original location on 19th Ave is a 10-minute walk from Music Row. Expect a short line. Order at least medium heat — the "light" is just fried chicken.', 50, 15, 'Walk', NULL),
('bna-8hr-8', 'bna-8hr', 8, 'Centennial Park & the Parthenon', 'A full-scale concrete replica of the Athenian Parthenon, built for the 1897 Tennessee Centennial Exposition. Strange, large, and genuinely worth seeing. The park is free; the Parthenon interior has a small admission.', 35, 5, 'Walk', '6.00'),
('bna-8hr-9', 'bna-8hr', 9, 'Return to airport', 'Uber from Centennial Park back to BNA. Allow 30 minutes for TSA security.', 20, 0, 'Uber/Lyft', '22.00');

-- -------------------------------------------------------
-- Logistics for BNA
-- -------------------------------------------------------

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'BNA',
'BNA handles both domestic and international flights. International travelers must clear US Customs and Border Protection on arrival — this is standard US entry. Nationals from Visa Waiver Program countries (most of Europe, Australia, Japan, South Korea, etc.) must have a valid ESTA approved before travel. All other nationalities require a US visa obtained in advance.',
'BNA does not have a dedicated staffed left-luggage service. A small number of coin-operated lockers are available in the terminal. For longer layovers, Bounce and similar third-party bag storage apps list nearby hotels and businesses that will hold luggage.',
'Allow 30 minutes for TSA security on return. TSA PreCheck lanes are available at BNA and move quickly. Standard lanes vary by time of day — mid-morning and early afternoon are typically the busiest. Keep your boarding pass and ID accessible.');

INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes) VALUES
(UUID(), 'FRA',
'Schengen rules apply at Frankfurt Airport. US, UK, Canadian, Australian, and most Asia-Pacific nationalities can enter visa-free for 90 days within 180. Some nationalities require a Schengen visa. Check the German Federal Foreign Office website for your passport country. Transit passengers staying airside in the international transit zone do not require a visa.',
'Gepäck-Aufbewahrung (left-luggage service) is available at T1 in Halle B (Level 0) and at T2. Rates from €8 per item per 24 hours. Coin lockers are also available throughout both terminals for smaller bags.',
'Allow 30 minutes for re-entry and security at Frankfurt. FRA has dedicated connecting passenger lanes that are often faster than the general queue. The airport is large — allow extra walking time from the S-Bahn platforms to your departure gate, especially if moving between T1 and T2.');
