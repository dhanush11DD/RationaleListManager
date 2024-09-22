import { Request, Response } from "express";
import { prismaClient } from "..";

// Create RationaleSpecialty
export const createRationaleSpecialty = async (req: Request, res: Response) => {
    try {
        const { enable, specialtyCodeId, rationaleId } = req.body;
        console.log(req.body)

        const newRationaleSpecialty = await prismaClient.rationaleSpecialty.create({
            data: {
                enable,
                specialtyCodeId,
                rationaleId,
            }
        });

        res.status(201).json(newRationaleSpecialty);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating RationaleSpecialty', error: error.message });
    }
};

// Get All RationaleSpecialties
export const getAllRationaleSpecialties = async (req: Request, res: Response) => {
    try {
        const rationaleSpecialties = await prismaClient.rationaleSpecialty.findMany({
            include: {
                specialtyCode: true,
                rationale: true
            }
        });
        res.status(200).json(rationaleSpecialties);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching RationaleSpecialties', error: error.message });
    }
};

// Get RationaleSpecialty By Id
export const getRationaleSpecialtyById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rationaleSpecialty = await prismaClient.rationaleSpecialty.findUnique({
            where: { id: parseInt(id) },
            include: {
                specialtyCode: true,
                rationale: true
            }
        });
        if (!rationaleSpecialty) {
            return res.status(404).json({ message: 'RationaleSpecialty not found' });
        }
        res.status(200).json(rationaleSpecialty);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching RationaleSpecialty', error: error.message });
    }
};

// Update RationaleSpecialty
export const updateRationaleSpecialty = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { enable, specialtyCodeId, rationaleId } = req.body;
    console.log(req.body)
    try {
        const updatedRationaleSpecialty = await prismaClient.rationaleSpecialty.update({
            where: { id: parseInt(id) },
            data: {
                enable,
                specialtyCodeId,
                rationaleId
            }
        });
        res.status(200).json(updatedRationaleSpecialty);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating RationaleSpecialty', error: error.message });
    }
};

// Delete RationaleSpecialty
export const deleteRationaleSpecialty = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaClient.rationaleSpecialty.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send(); // 204 No Content should not have a response body
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting RationaleSpecialty', error: error.message });
    }
};
