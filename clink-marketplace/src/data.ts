export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    sold: number;
    store: string;
    storeId: string;
    location: string;
    country: string;
    scope: 'local' | 'international' | 'global';
    image: string;
    description: string;
    stock: number;
    tags: string[];
};

export const categories = [
    'Electronics', 'Fashion', 'Beauty', 'Food', 'Home', 'School', 'Sports',
    'Accessories', 'Health & Wellness', 'Services', 'Local Products',
    'Digital Products', 'Others',
];

export const products: Product[] = [
    {
        id: 'wireless-earbuds', name: 'Wireless Earbuds', category: 'Electronics', price: 1290,
        originalPrice: 1690, rating: 4.9, reviews: 128, sold: 340, store: 'Davao Gadget Hub',
        storeId: 'davao-gadget-hub', location: 'Davao City', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85',
        description: 'A pocket-sized everyday audio upgrade. Enjoy a clear, balanced sound, a comfortable fit, and a compact charging case made for commutes and long workdays.', stock: 24,
        tags: ['audio', 'wireless', 'daily essentials'],
    },
    {
        id: 'bluetooth-speaker', name: 'Pocket Bluetooth Speaker', category: 'Electronics', price: 1850,
        rating: 4.8, reviews: 86, sold: 211, store: 'CDO Tech Corner', storeId: 'cdo-tech-corner',
        location: 'Cagayan de Oro', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85',
        description: 'Room-filling sound in a carry-anywhere form. A sturdy everyday speaker with easy Bluetooth pairing and a clean, understated finish.', stock: 15,
        tags: ['audio', 'speaker', 'wireless'],
    },
    {
        id: 'phone-case', name: 'Everyday Phone Case', category: 'Accessories', price: 390,
        originalPrice: 550, rating: 4.7, reviews: 42, sold: 185, store: 'Urban Essentials', storeId: 'urban-essentials',
        location: 'Manila', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=900&q=85',
        description: 'A slim, grippy case with raised edges for the everyday bumps. Made to keep your phone protected without adding bulk.', stock: 38,
        tags: ['phone', 'accessories', 'protection'],
    },
    {
        id: 'power-bank', name: 'Compact Power Bank', category: 'Electronics', price: 990,
        rating: 4.8, reviews: 73, sold: 159, store: 'Davao Gadget Hub', storeId: 'davao-gadget-hub',
        location: 'Davao City', country: 'Philippines', scope: 'global',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=85',
        description: 'A reliable backup for busy days out. Small enough to slip into a pocket, with clear charging indicators and a durable matte shell.', stock: 19,
        tags: ['charging', 'travel', 'electronics'],
    },
    {
        id: 'usb-hub', name: 'USB-C Desk Hub', category: 'Electronics', price: 1490,
        originalPrice: 1790, rating: 4.6, reviews: 31, sold: 94, store: 'Manila Home Finds', storeId: 'manila-home-finds',
        location: 'Manila', country: 'Philippines', scope: 'global',
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85',
        description: 'Give your laptop a little more room to connect. This compact hub brings the ports you reach for into one tidy desk companion.', stock: 12,
        tags: ['work', 'desk', 'electronics'],
    },
    {
        id: 'wireless-mouse', name: 'Wireless Mouse', category: 'Electronics', price: 720,
        rating: 4.7, reviews: 57, sold: 138, store: 'CDO Tech Corner', storeId: 'cdo-tech-corner',
        location: 'Cagayan de Oro', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85',
        description: 'A quiet-click mouse for focused work. Its comfortable shape and dependable wireless connection make it an easy desk essential.', stock: 29,
        tags: ['work', 'wireless', 'desk'],
    },
    {
        id: 'linen-shirt', name: 'Weekend Linen Shirt', category: 'Fashion', price: 890,
        rating: 4.9, reviews: 64, sold: 122, store: 'Cebu Streetwear', storeId: 'cebu-streetwear',
        location: 'Cebu City', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85',
        description: 'An easy layer for warm afternoons. Soft, breathable linen with a relaxed fit that works just as well for weekends as it does for dinner out.', stock: 17,
        tags: ['clothing', 'linen', 'summer'],
    },
    {
        id: 'island-skincare', name: 'Island Glow Face Oil', category: 'Beauty', price: 680,
        originalPrice: 820, rating: 4.8, reviews: 91, sold: 205, store: 'Island Beauty PH', storeId: 'island-beauty-ph',
        location: 'Iloilo City', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85',
        description: 'A lightweight face oil for a simple evening routine. Blends plant-derived oils in a small-batch formula made by a local beauty studio.', stock: 22,
        tags: ['skincare', 'local', 'self care'],
    },
    {
        id: 'woven-basket', name: 'Handwoven Market Basket', category: 'Local Products', price: 1150,
        rating: 5, reviews: 38, sold: 76, store: 'Island Craft House', storeId: 'island-craft-house',
        location: 'Digos', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
        description: 'Woven by hand in Davao del Sur using locally sourced fibers. Each basket carries its own small variations and is ready for market mornings or home storage.', stock: 8,
        tags: ['handmade', 'local', 'home'],
    },
    {
        id: 'ceramic-mug', name: 'Studio Ceramic Mug', category: 'Home', price: 540,
        rating: 4.9, reviews: 28, sold: 61, store: 'Manila Home Finds', storeId: 'manila-home-finds',
        location: 'Manila', country: 'Philippines', scope: 'global',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85',
        description: 'A handmade stoneware mug with a comfortable handle and a softly glazed finish. Made in small batches for slow coffee mornings.', stock: 11,
        tags: ['home', 'ceramics', 'handmade'],
    },
    {
        id: 'coffee-beans', name: 'Mt. Apo Coffee Beans', category: 'Food', price: 480,
        rating: 4.9, reviews: 112, sold: 290, store: 'Highland Coffee Co.', storeId: 'highland-coffee-co',
        location: 'Davao City', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=85',
        description: 'A smooth medium roast from the foothills of Mt. Apo. Notes of cacao and ripe fruit make it an easy cup for pour-over or espresso.', stock: 44,
        tags: ['coffee', 'local', 'food'],
    },
    {
        id: 'canvas-tote', name: 'Everyday Canvas Tote', category: 'Fashion', price: 620,
        rating: 4.7, reviews: 45, sold: 98, store: 'Cebu Streetwear', storeId: 'cebu-streetwear',
        location: 'Cebu City', country: 'Philippines', scope: 'local',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
        description: 'A sturdy canvas tote with room for market finds, books, and the things you carry every day. Made to be used, washed, and used again.', stock: 23,
        tags: ['bag', 'everyday', 'fashion'],
    },
    {
        id: 'desk-lamp', name: 'Foldable Desk Lamp', category: 'Home', price: 1390,
        rating: 4.6, reviews: 19, sold: 52, store: 'Manila Home Finds', storeId: 'manila-home-finds',
        location: 'Manila', country: 'Philippines', scope: 'global',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
        description: 'A warm, focused light for late-night reading and early starts. Folds flat when your desk needs a little extra breathing room.', stock: 9,
        tags: ['home', 'desk', 'lighting'],
    },
    {
        id: 'japanese-notebook', name: 'Japanese Grid Notebook', category: 'School', price: 360,
        rating: 4.8, reviews: 35, sold: 88, store: 'Paper & Form', storeId: 'paper-and-form',
        location: 'Tokyo', country: 'Japan', scope: 'international',
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85',
        description: 'A lay-flat notebook with crisp grid pages and a paper cover. An everyday companion for sketches, lists, and ideas in progress.', stock: 31,
        tags: ['stationery', 'school', 'paper'],
    },
    {
        id: 'leather-wallet', name: 'Slim Leather Wallet', category: 'Accessories', price: 2250,
        rating: 4.8, reviews: 47, sold: 105, store: 'Northbound Goods', storeId: 'northbound-goods',
        location: 'Singapore', country: 'Singapore', scope: 'international',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85',
        description: 'A compact wallet cut from full-grain leather and designed to soften with use. Holds the essentials without taking over your pocket.', stock: 14,
        tags: ['leather', 'accessories', 'everyday'],
    },
    {
        id: 'yoga-mat', name: 'Natural Cork Yoga Mat', category: 'Sports', price: 2890,
        rating: 4.9, reviews: 52, sold: 73, store: 'Slow Form Studio', storeId: 'slow-form-studio',
        location: 'Melbourne', country: 'Australia', scope: 'international',
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=900&q=85',
        description: 'A grounded, grippy surface for your daily practice. Natural cork on top, supportive cushioning underneath, and a simple strap for the trip to class.', stock: 7,
        tags: ['fitness', 'wellness', 'sports'],
    },
    {
        id: 'website-service', name: 'One-page Store Setup', category: 'Services', price: 3500,
        rating: 5, reviews: 16, sold: 27, store: 'Pixel & Paper Studio', storeId: 'pixel-paper-studio',
        location: 'Davao City', country: 'Philippines', scope: 'global',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85',
        description: 'A one-hour setup session to organize your product photos, write a clear store intro, and get your first shareable product links ready.', stock: 5,
        tags: ['service', 'seller tools', 'design'],
    },
];

export const stores = [
    { id: 'davao-gadget-hub', name: 'Davao Gadget Hub', location: 'Davao City', country: 'Philippines', description: 'Useful tech, carefully picked for everyday life. Local pickup available in Davao City.', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1000&q=85' },
    { id: 'cebu-streetwear', name: 'Cebu Streetwear', location: 'Cebu City', country: 'Philippines', description: 'Easy pieces from independent Cebu labels. Made for the city, the coast, and everywhere between.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85' },
    { id: 'manila-home-finds', name: 'Manila Home Finds', location: 'Manila', country: 'Philippines', description: 'Small things that make home feel a little more like yours, sourced from makers across Manila.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85' },
    { id: 'island-beauty-ph', name: 'Island Beauty PH', location: 'Iloilo City', country: 'Philippines', description: 'Thoughtful, locally made care for simple routines and slower mornings.', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85' },
    { id: 'cdo-tech-corner', name: 'CDO Tech Corner', location: 'Cagayan de Oro', country: 'Philippines', description: 'Smart tools and small tech that earn their place in your everyday setup.', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=85' },
    { id: 'urban-essentials', name: 'Urban Essentials', location: 'Manila', country: 'Philippines', description: 'Useful, well-made details for daily carry and life on the move.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85' },
    { id: 'paper-and-form', name: 'Paper & Form', location: 'Tokyo', country: 'Japan', description: 'Considered stationery and tools for putting ideas down on paper.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85' },
    { id: 'northbound-goods', name: 'Northbound Goods', location: 'Singapore', country: 'Singapore', description: 'Quietly useful everyday carry, made to age well and travel far.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85' },
];

export const demoOrders = [
    { id: 'CL-2026-1038', date: 'Sep 28, 2026', status: 'In Transit', items: 'Wireless Earbuds', total: 1290, store: 'Davao Gadget Hub' },
    { id: 'CL-2026-1029', date: 'Sep 24, 2026', status: 'Delivered', items: 'Mt. Apo Coffee Beans, Studio Ceramic Mug', total: 1020, store: '2 stores' },
    { id: 'CL-2026-1014', date: 'Sep 19, 2026', status: 'Preparing', items: 'Island Glow Face Oil', total: 680, store: 'Island Beauty PH' },
    { id: 'CL-2026-1007', date: 'Sep 12, 2026', status: 'Cancelled', items: 'Everyday Phone Case', total: 390, store: 'Urban Essentials' },
];

export const suggestions = ['Wireless Earbuds', 'Wireless Mouse', 'Wireless Keyboard', 'Davao Gadget Hub', 'Tech Accessories'];
