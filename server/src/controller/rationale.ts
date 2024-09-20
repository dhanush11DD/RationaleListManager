import { Request, Response } from "express";
import { prismaClient } from "..";


export const createRationale = async (req: Request, res: Response) => {
    try {
        const rationaleData = req.body;
        const newRationale = await prismaClient.rationale.create({
            data: {
                ...rationaleData
            }
        });
        res.status(201).json(newRationale);
    } catch (error:any) {
        res.status(500).json({ message: 'Error creating rationale', error: error.message });
    }
};

export const getAllRationales = async (req: Request, res: Response) => {
    try {
        const rationales = await prismaClient.rationale.findMany({
            include: {
                specialties: true,
                decision: true,
                procedures: true,
                modifiers: true
            }
        });
        res.status(200).json(rationales);
    } catch (error:any) {
        res.status(500).json({ message: 'Error fetching rationales', error: error.message });
    }
};

export const getRationaleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rationale = await prismaClient.rationale.findUnique({
            where: { id: parseInt(id) },
            include: {
                specialties: true,
                decision: true,
                procedures: true,
                modifiers: true
            }
        });
        if (!rationale) {
            return res.status(404).json({ message: 'Rationale not found' });
        }
        res.status(200).json(rationale);
    } catch (error:any) {
        res.status(500).json({ message: 'Error fetching rationale', error: error.message });
    }
};

export const updateRationale = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rationaleData = req.body;
    try {
        const updatedRationale = await prismaClient.rationale.update({
            where: { id: parseInt(id) },
            data: {
                ...rationaleData
            }
        });
        res.status(200).json(updatedRationale);
    } catch (error:any) {
        res.status(500).json({ message: 'Error updating rationale', error: error.message });
    }
};

export const deleteRationale = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    try {
        const rationale = await prismaClient.rationale.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).json({ message: 'Rationale deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ message: 'Error deleting rationale', error: error.message });
    }
};
