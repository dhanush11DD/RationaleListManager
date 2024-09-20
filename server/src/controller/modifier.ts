import { Request, Response } from "express";
import { prismaClient } from "..";

// Create RationaleModifier
export const createRationaleModifier = async (req: Request, res: Response) => {
    try {
        const { modifierList, rationaleId } = req.body;

        const newRationaleModifier = await prismaClient.rationaleModifier.create({
            data: {
                modifierList,
                rationaleId,
            }
        });

        res.status(201).json(newRationaleModifier);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating RationaleModifier', error: error.message });
    }
};

// Get All RationaleModifiers
export const getAllRationaleModifiers = async (req: Request, res: Response) => {
    try {
        const rationaleModifiers = await prismaClient.rationaleModifier.findMany({
            include: {
                rationale: true
            }
        });
        res.status(200).json(rationaleModifiers);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching RationaleModifiers', error: error.message });
    }
};

// Get RationaleModifier By Id
export const getRationaleModifierById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rationaleModifier = await prismaClient.rationaleModifier.findUnique({
            where: { id: parseInt(id) },
            include: {
                rationale: true
            }
        });
        if (!rationaleModifier) {
            return res.status(404).json({ message: 'RationaleModifier not found' });
        }
        res.status(200).json(rationaleModifier);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching RationaleModifier', error: error.message });
    }
};

// Update RationaleModifier
export const updateRationaleModifier = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { modifierList, rationaleId } = req.body;
    try {
        const updatedRationaleModifier = await prismaClient.rationaleModifier.update({
            where: { id: parseInt(id) },
            data: {
                modifierList,
                rationaleId
            }
        });
        res.status(200).json(updatedRationaleModifier);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating RationaleModifier', error: error.message });
    }
};

// Delete RationaleModifier
export const deleteRationaleModifier = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaClient.rationaleModifier.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send(); // No Content
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting RationaleModifier', error: error.message });
    }
};
