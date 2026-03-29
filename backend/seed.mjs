/**
 * Seed data: ~30 curated PC components with realistic Indian pricing.
 * This is loaded into the in-memory store on server startup.
 * If MongoDB is connected, it can also be used to populate the DB.
 */

export const seedComponents = [
    // ─── CPUs ────────────────────────────────────────────────────
    {
        id: "cpu_001",
        type: "cpu",
        name: "Intel Core i5-13400F",
        brand: "Intel",
        model: "i5-13400F",
        specs: {
            socket: "LGA1700",
            cores: 10,
            threads: 16,
            baseClock: "2.5 GHz",
            boostClock: "4.6 GHz",
            tdp: 65,
            generation: "13th Gen Raptor Lake"
        },
        price: 15499,
        compatibility: { socket: "LGA1700", chipsets: ["B660", "B760", "Z690", "Z790", "H770"] },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "cpu_002",
        type: "cpu",
        name: "Intel Core i5-13500HX",
        brand: "Intel",
        model: "i5-13500HX",
        specs: {
            socket: "LGA1700",
            cores: 14,
            threads: 20,
            baseClock: "2.5 GHz",
            boostClock: "4.7 GHz",
            tdp: 55,
            generation: "13th Gen Raptor Lake"
        },
        price: 18999,
        compatibility: { socket: "LGA1700", chipsets: ["B760", "Z790", "H770"] },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "cpu_003",
        type: "cpu",
        name: "AMD Ryzen 5 5600X",
        brand: "AMD",
        model: "Ryzen 5 5600X",
        specs: {
            socket: "AM4",
            cores: 6,
            threads: 12,
            baseClock: "3.7 GHz",
            boostClock: "4.6 GHz",
            tdp: 65,
            generation: "Zen 3"
        },
        price: 12999,
        compatibility: { socket: "AM4", chipsets: ["B450", "B550", "X570"] },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "cpu_004",
        type: "cpu",
        name: "Intel Core i9-13900K",
        brand: "Intel",
        model: "i9-13900K",
        specs: {
            socket: "LGA1700",
            cores: 24,
            threads: 32,
            baseClock: "3.0 GHz",
            boostClock: "5.8 GHz",
            tdp: 125,
            generation: "13th Gen Raptor Lake"
        },
        price: 48999,
        compatibility: { socket: "LGA1700", chipsets: ["Z690", "Z790"] },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },

    // ─── Motherboards ────────────────────────────────────────────
    {
        id: "mobo_001",
        type: "motherboard",
        name: "MSI PRO B760M-A WiFi",
        brand: "MSI",
        model: "PRO B760M-A WiFi",
        specs: {
            socket: "LGA1700",
            chipset: "B760",
            formFactor: "Micro-ATX",
            ramSlots: 4,
            maxRam: "128GB",
            ramType: "DDR5",
            m2Slots: 2,
            pciSlots: 1
        },
        price: 13499,
        compatibility: { socket: "LGA1700", chipset: "B760", ramType: "DDR5" },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "mobo_002",
        type: "motherboard",
        name: "ASUS ROG Maximus Z790 Hero",
        brand: "ASUS",
        model: "ROG Maximus Z790 Hero",
        specs: {
            socket: "LGA1700",
            chipset: "Z790",
            formFactor: "E-ATX",
            ramSlots: 4,
            maxRam: "128GB",
            ramType: "DDR5",
            m2Slots: 5,
            pciSlots: 2
        },
        price: 54999,
        compatibility: { socket: "LGA1700", chipset: "Z790", ramType: "DDR5" },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "mobo_003",
        type: "motherboard",
        name: "Gigabyte B550 AORUS Elite V2",
        brand: "Gigabyte",
        model: "B550 AORUS Elite V2",
        specs: {
            socket: "AM4",
            chipset: "B550",
            formFactor: "ATX",
            ramSlots: 4,
            maxRam: "128GB",
            ramType: "DDR4",
            m2Slots: 2,
            pciSlots: 2
        },
        price: 12499,
        compatibility: { socket: "AM4", chipset: "B550", ramType: "DDR4" },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },

    // ─── GPUs ────────────────────────────────────────────────────
    {
        id: "gpu_001",
        type: "gpu",
        name: "NVIDIA GeForce RTX 3060 Ti",
        brand: "NVIDIA",
        model: "RTX 3060 Ti",
        specs: {
            vram: "8GB GDDR6",
            boostClock: "1665 MHz",
            tdp: 200,
            interface: "PCIe 4.0 x16",
            outputs: "HDMI 2.1, 3x DisplayPort 1.4a"
        },
        price: 36500,
        compatibility: { interface: "PCIe 4.0", tdp: 200, minPSU: 600, length: 242 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "gpu_002",
        type: "gpu",
        name: "AMD Radeon RX 6700 XT",
        brand: "AMD",
        model: "RX 6700 XT",
        specs: {
            vram: "12GB GDDR6",
            boostClock: "2321 MHz",
            tdp: 230,
            interface: "PCIe 4.0 x16",
            outputs: "HDMI 2.1, 3x DisplayPort 1.4"
        },
        price: 34999,
        compatibility: { interface: "PCIe 4.0", tdp: 230, minPSU: 650, length: 267 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "gpu_003",
        type: "gpu",
        name: "NVIDIA GeForce RTX 4090",
        brand: "NVIDIA",
        model: "RTX 4090",
        specs: {
            vram: "24GB GDDR6X",
            boostClock: "2520 MHz",
            tdp: 450,
            interface: "PCIe 4.0 x16",
            outputs: "HDMI 2.1, 3x DisplayPort 1.4a"
        },
        price: 159999,
        compatibility: { interface: "PCIe 4.0", tdp: 450, minPSU: 850, length: 336 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "gpu_004",
        type: "gpu",
        name: "NVIDIA GeForce GTX 1650",
        brand: "NVIDIA",
        model: "GTX 1650",
        specs: {
            vram: "4GB GDDR6",
            boostClock: "1590 MHz",
            tdp: 75,
            interface: "PCIe 3.0 x16",
            outputs: "HDMI 2.0b, DisplayPort 1.4"
        },
        price: 12999,
        compatibility: { interface: "PCIe 3.0", tdp: 75, minPSU: 350, length: 200 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },

    // ─── RAM ─────────────────────────────────────────────────────
    {
        id: "ram_001",
        type: "ram",
        name: "Corsair Vengeance 16GB DDR5-5600",
        brand: "Corsair",
        model: "Vengeance DDR5-5600",
        specs: {
            capacity: "16GB (2x8GB)",
            type: "DDR5",
            speed: "5600 MHz",
            cas: "CL36",
            voltage: "1.25V",
            height: "34mm"
        },
        price: 5499,
        compatibility: { type: "DDR5", height: 34 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "ram_002",
        type: "ram",
        name: "Corsair Vengeance 32GB DDR5-5600",
        brand: "Corsair",
        model: "Vengeance 32GB DDR5",
        specs: {
            capacity: "32GB (2x16GB)",
            type: "DDR5",
            speed: "5600 MHz",
            cas: "CL36",
            voltage: "1.25V",
            height: "44mm"
        },
        price: 9999,
        compatibility: { type: "DDR5", height: 44 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "ram_003",
        type: "ram",
        name: "G.Skill Ripjaws V 16GB DDR4-3200",
        brand: "G.Skill",
        model: "Ripjaws V DDR4-3200",
        specs: {
            capacity: "16GB (2x8GB)",
            type: "DDR4",
            speed: "3200 MHz",
            cas: "CL16",
            voltage: "1.35V",
            height: "42mm"
        },
        price: 3299,
        compatibility: { type: "DDR4", height: 42 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },

    // ─── Storage ─────────────────────────────────────────────────
    {
        id: "storage_001",
        type: "storage",
        name: "Samsung 970 EVO Plus 1TB NVMe",
        brand: "Samsung",
        model: "970 EVO Plus 1TB",
        specs: {
            capacity: "1TB",
            type: "NVMe M.2",
            interface: "PCIe 3.0 x4",
            readSpeed: "3500 MB/s",
            writeSpeed: "3300 MB/s"
        },
        price: 6999,
        compatibility: { interface: "M.2 NVMe" },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "storage_002",
        type: "storage",
        name: "WD Black SN770 1TB NVMe",
        brand: "Western Digital",
        model: "SN770 1TB",
        specs: {
            capacity: "1TB",
            type: "NVMe M.2",
            interface: "PCIe 4.0 x4",
            readSpeed: "5150 MB/s",
            writeSpeed: "4900 MB/s"
        },
        price: 5499,
        compatibility: { interface: "M.2 NVMe PCIe 4.0" },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "storage_003",
        type: "storage",
        name: "Seagate Barracuda 2TB HDD",
        brand: "Seagate",
        model: "Barracuda 2TB",
        specs: {
            capacity: "2TB",
            type: "HDD 3.5\"",
            interface: "SATA III",
            rpm: 7200,
            cache: "256MB"
        },
        price: 4299,
        compatibility: { interface: "SATA III" },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },

    // ─── PSUs ────────────────────────────────────────────────────
    {
        id: "psu_001",
        type: "psu",
        name: "Corsair RM750e 750W 80+ Gold",
        brand: "Corsair",
        model: "RM750e",
        specs: {
            wattage: 750,
            efficiency: "80+ Gold",
            modular: "Fully Modular",
            fanSize: "135mm"
        },
        price: 7999,
        compatibility: { wattage: 750 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "psu_002",
        type: "psu",
        name: "Corsair RM1000x 1000W 80+ Gold",
        brand: "Corsair",
        model: "RM1000x",
        specs: {
            wattage: 1000,
            efficiency: "80+ Gold",
            modular: "Fully Modular",
            fanSize: "135mm"
        },
        price: 13999,
        compatibility: { wattage: 1000 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "psu_003",
        type: "psu",
        name: "Cooler Master MWE 550W 80+ Bronze",
        brand: "Cooler Master",
        model: "MWE 550",
        specs: {
            wattage: 550,
            efficiency: "80+ Bronze",
            modular: "Non-Modular",
            fanSize: "120mm"
        },
        price: 3999,
        compatibility: { wattage: 550 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },

    // ─── CPU Coolers ─────────────────────────────────────────────
    {
        id: "cooler_001",
        type: "cpu-cooler",
        name: "NZXT Kraken Z73 360mm AIO",
        brand: "NZXT",
        model: "Kraken Z73",
        specs: {
            type: "AIO Liquid Cooler",
            radiator: "360mm",
            fans: "3x 120mm",
            sockets: ["LGA1700", "AM4", "AM5"],
            tdpRating: 250
        },
        price: 18999,
        compatibility: { sockets: ["LGA1700", "AM4", "AM5"], radiator: 360 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "cooler_002",
        type: "cpu-cooler",
        name: "Deepcool AK400 Tower Cooler",
        brand: "Deepcool",
        model: "AK400",
        specs: {
            type: "Air Cooler",
            height: "155mm",
            fans: "1x 120mm",
            sockets: ["LGA1700", "AM4", "AM5"],
            tdpRating: 150
        },
        price: 2199,
        compatibility: { sockets: ["LGA1700", "AM4", "AM5"], height: 155 },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },

    // ─── Cases ───────────────────────────────────────────────────
    {
        id: "case_001",
        type: "case",
        name: "NZXT H510 Flow Mid Tower",
        brand: "NZXT",
        model: "H510 Flow",
        specs: {
            formFactor: "Mid-Tower",
            supportedMobo: ["ATX", "Micro-ATX", "Mini-ITX"],
            maxGPULength: 381,
            maxCoolerHeight: 165,
            radiatorSupport: "280mm front, 120mm rear",
            driveBays: "2x 3.5\", 2x 2.5\""
        },
        price: 7499,
        compatibility: { maxGPULength: 381, maxCoolerHeight: 165, formFactors: ["ATX", "Micro-ATX", "Mini-ITX"] },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "case_002",
        type: "case",
        name: "Corsair 4000D Airflow Mid Tower",
        brand: "Corsair",
        model: "4000D Airflow",
        specs: {
            formFactor: "Mid-Tower",
            supportedMobo: ["ATX", "Micro-ATX", "Mini-ITX"],
            maxGPULength: 360,
            maxCoolerHeight: 170,
            radiatorSupport: "360mm front, 120mm rear",
            driveBays: "2x 3.5\", 2x 2.5\""
        },
        price: 8499,
        compatibility: { maxGPULength: 360, maxCoolerHeight: 170, formFactors: ["ATX", "Micro-ATX", "Mini-ITX"] },
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },

    // ─── Case Fans ───────────────────────────────────────────────
    {
        id: "fan_001",
        type: "case-fan",
        name: "Corsair iCUE SP120 RGB Elite 3-Pack",
        brand: "Corsair",
        model: "SP120 RGB Elite",
        specs: {
            size: "120mm",
            quantity: 3,
            rpm: "1500 RPM",
            airflow: "47.7 CFM",
            noise: "18 dBA",
            rgb: true
        },
        price: 3499,
        compatibility: {},
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    },
    {
        id: "fan_002",
        type: "case-fan",
        name: "Noctua NF-A12x25 PWM 120mm",
        brand: "Noctua",
        model: "NF-A12x25 PWM",
        specs: {
            size: "120mm",
            quantity: 1,
            rpm: "2000 RPM",
            airflow: "60.1 CFM",
            noise: "22.6 dBA",
            rgb: false
        },
        price: 2799,
        compatibility: {},
        images: [],
        links: { vendor: "Amazon India", url: "#" }
    }
];

/**
 * Load seed data into the in-memory store.
 */
export function loadSeedData(store) {
    store.components = [...seedComponents];
    console.log(`📦 Loaded ${store.components.length} components into store`);
}
