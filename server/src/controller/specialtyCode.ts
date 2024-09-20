import { Request, Response } from "express";
import { prismaClient } from "..";

// Create SpecialtyCode
export const createSpecialtyCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;

        const newSpecialtyCode = await prismaClient.specialtyCode.create({
            data: {
                code
            }
        });

        res.status(201).json(newSpecialtyCode);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating SpecialtyCode', error: error.message });
    }
};

// Get All SpecialtyCodes
export const getAllSpecialtyCodes = async (req: Request, res: Response) => {
    try {
        const specialtyCodes = await prismaClient.specialtyCode.findMany({
            include: {
                rationaleSpecialty: true
            }
        });
        res.status(200).json(specialtyCodes);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching SpecialtyCodes', error: error.message });
    }
};

// Get SpecialtyCode By Id
export const getSpecialtyCodeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const specialtyCode = await prismaClient.specialtyCode.findUnique({
            where: { id: parseInt(id) },
            include: {
                rationaleSpecialty: true
            }
        });
        if (!specialtyCode) {
            return res.status(404).json({ message: 'SpecialtyCode not found' });
        }
        res.status(200).json(specialtyCode);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching SpecialtyCode', error: error.message });
    }
};

// Update SpecialtyCode
export const updateSpecialtyCode = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code } = req.body;
    try {
        const updatedSpecialtyCode = await prismaClient.specialtyCode.update({
            where: { id: parseInt(id) },
            data: {
                code
            }
        });
        res.status(200).json(updatedSpecialtyCode);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating SpecialtyCode', error: error.message });
    }
};

// Delete SpecialtyCode
export const deleteSpecialtyCode = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaClient.specialtyCode.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send(); // 204 No Content should not have a response body
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting SpecialtyCode', error: error.message });
    }
};
