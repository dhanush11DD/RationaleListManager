import { Request, Response } from "express";
import { prismaClient } from "..";

// Create RationaleDecision
export const createRationaleDecision = async (req: Request, res: Response) => {
    try {
        const { decisionText, decisionId, rationaleId } = req.body;

        const newRationaleDecision = await prismaClient.rationaleDecision.create({
            data: {
                decisionText,
                decisionId,
                rationaleId,
            }
        });

        res.status(201).json(newRationaleDecision);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating RationaleDecision', error: error.message });
    }
};

// Get All RationaleDecisions
export const getAllRationaleDecisions = async (req: Request, res: Response) => {
    try {
        const rationaleDecisions = await prismaClient.rationaleDecision.findMany({
            include: {
                decision: true,
                rationale: true
            }
        });
        res.status(200).json(rationaleDecisions);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching RationaleDecisions', error: error.message });
    }
};

// Get RationaleDecision By Id
export const getRationaleDecisionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rationaleDecision = await prismaClient.rationaleDecision.findUnique({
            where: { id: parseInt(id) },
            include: {
                decision: true,
                rationale: true
            }
        });
        if (!rationaleDecision) {
            return res.status(404).json({ message: 'RationaleDecision not found' });
        }
        res.status(200).json(rationaleDecision);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching RationaleDecision', error: error.message });
    }
};

// Update RationaleDecision
export const updateRationaleDecision = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { decisionText, decisionId, rationaleId } = req.body;
    try {
        const updatedRationaleDecision = await prismaClient.rationaleDecision.update({
            where: { id: parseInt(id) },
            data: {
                decisionText,
                decisionId,
                rationaleId
            }
        });
        res.status(200).json(updatedRationaleDecision);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating RationaleDecision', error: error.message });
    }
};

// Delete RationaleDecision
export const deleteRationaleDecision = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaClient.rationaleDecision.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send(); // No Content
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting RationaleDecision', error: error.message });
    }
};
