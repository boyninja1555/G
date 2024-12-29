import fs from "fs"
import path from "path"
import { config } from "../config"

export function setupDatabase() {
    if (!fs.existsSync(config.databaseRoot)) {
        fs.mkdirSync(config.databaseRoot)
    }
}

export function readTableGroup(tableGroupPath: string) {
    const tableGroupFullPath = path.join(config.databaseRoot, tableGroupPath)
    
    if (!fs.existsSync(tableGroupFullPath)) {
        return []
    }

    const tableGroupFiles = fs.readdirSync(tableGroupFullPath)
    return tableGroupFiles.map(file => file.replace(/\.[^/.]+$/, ""))
}

export function readTable(tableName: string, tableType: string) {
    const filePath = `${config.databaseRoot}/${tableName}.${tableType}`

    if (!fs.existsSync(filePath)) {
        return tableType === "json" ? {} : ""
    }

    const data = fs.readFileSync(filePath, "utf-8")
    return tableType === "json" ? JSON.parse(data) : data
}

export function createTableGroup(tableGroupPath: string) {
    const tableGroupFullPath = path.join(config.databaseRoot, tableGroupPath)
    
    if (!fs.existsSync(tableGroupFullPath)) {
        fs.mkdirSync(tableGroupFullPath)
    }
    
    return readTableGroup(tableGroupPath)
}

export function writeTable(tableName: string, tableType: string, tableData: any) {
    const filePath = `${config.databaseRoot}/${tableName}.${tableType}`
    fs.writeFileSync(filePath, JSON.stringify(tableData, null, 2))
}

export function deleteTable(tableName: string, tableType: string) {
    const filePath = `${config.databaseRoot}/${tableName}.${tableType}`
    fs.rmSync(filePath)
}

export function tableGroupExists(tableGroupPath: string) {
    return fs.existsSync(path.join(config.databaseRoot, tableGroupPath))
}

export function tableExists(tableName: string, tableType: string) {
    return fs.existsSync(`${config.databaseRoot}/${tableName}.${tableType}`)
}
