import { Request, Response } from "express";
import { prismaClient } from "..";

// Create RationaleProcedure
export const createRationaleProcedure = async (req: Request, res: Response) => {
    try {
        const { serviceCodeFrom, serviceCodeTo, serviceCodeList, rationaleId } = req.body;

        const newRationaleProcedure = await prismaClient.rationaleProcedure.create({
            data: {
                serviceCodeFrom,
                serviceCodeTo,
                serviceCodeList,
                rationaleId,
            }
        });

        res.status(201).json(newRationaleProcedure);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating RationaleProcedure', error: error.message });
    }
};

// Get All RationaleProcedures
export const getAllRationaleProcedures = async (req: Request, res: Response) => {
    try {
        const rationaleProcedures = await prismaClient.rationaleProcedure.findMany({
            include: {
                rationale: true
            }
        });
        res.status(200).json(rationaleProcedures);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching RationaleProcedures', error: error.message });
    }
};

// Get RationaleProcedure By Id
export const getRationaleProcedureById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rationaleProcedure = await prismaClient.rationaleProcedure.findUnique({
            where: { id: parseInt(id) },
            include: {
                rationale: true
            }
        });
        if (!rationaleProcedure) {
            return res.status(404).json({ message: 'RationaleProcedure not found' });
        }
        res.status(200).json(rationaleProcedure);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching RationaleProcedure', error: error.message });
    }
};

// Update RationaleProcedure
export const updateRationaleProcedure = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { serviceCodeFrom, serviceCodeTo, serviceCodeList, rationaleId } = req.body;
    try {
        const updatedRationaleProcedure = await prismaClient.rationaleProcedure.update({
            where: { id: parseInt(id) },
            data: {
                serviceCodeFrom,
                serviceCodeTo,
                serviceCodeList,
                rationaleId
            }
        });
        res.status(200).json(updatedRationaleProcedure);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating RationaleProcedure', error: error.message });
    }
};

// Delete RationaleProcedure
export const deleteRationaleProcedure = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaClient.rationaleProcedure.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send(); // No Content
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting RationaleProcedure', error: error.message });
    }
};
