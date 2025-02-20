enum InventoryCategories {
    Building = "building",
    Cooling = "cooling",
    Energy = "energy",
    EnergyBackup = "energy_backup",
    Maintenace = "maintenance",
    Water = "water"
}

type DataCenter = {
    name: string,
    category: InventoryCategories,
    quantity: number,
    lifespan: number
}
