import { Request, Response } from "express";
import { prismaClient } from "..";

// Create DecisionList
export const createDecisionList = async (req: Request, res: Response) => {
    try {
        const { decision } = req.body;

        console.log(req.body)

        const newDecisionList = await prismaClient.decisionList.create({
            data: {
                decision
            }
        });

        res.status(201).json(newDecisionList);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating DecisionList', error: error.message });
    }
};

// Get All DecisionLists
export const getAllDecisionLists = async (req: Request, res: Response) => {
    try {
        const decisionLists = await prismaClient.decisionList.findMany({
            include: {
                rationaleDecision: true
            }
        });
        res.status(200).json(decisionLists);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching DecisionLists', error: error.message });
    }
};

// Get DecisionList By Id
export const getDecisionListById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decisionList = await prismaClient.decisionList.findUnique({
            where: { id: parseInt(id) },
            include: {
                rationaleDecision: true
            }
        });
        if (!decisionList) {
            return res.status(404).json({ message: 'DecisionList not found' });
        }
        res.status(200).json(decisionList);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching DecisionList', error: error.message });
    }
};

// Update DecisionList
export const updateDecisionList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { decision } = req.body;
    try {
        const updatedDecisionList = await prismaClient.decisionList.update({
            where: { id: parseInt(id) },
            data: {
                decision
            }
        });
        res.status(200).json(updatedDecisionList);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating DecisionList', error: error.message });
    }
};

// Delete DecisionList
export const deleteDecisionList = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaClient.decisionList.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send(); // 204 No Content should not have a response body
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting DecisionList', error: error.message });
    }
};
