export const createCandidateSchema = {
    type: "object",
    required: ["id", "name", "createdAt"],
    properties: {
        id: {
            type: "string"
        },
        name: {
            type: "string",
            minLength: 1
        },
        recruiter: {
            type: "string"
        },
        unitManager: {
            type: "string"
        },
        unit: {
            type: "string"
        },
        createdAt: {
            type: "string"
        }
    }
};

export const updateStageSchema = {
    type: "object",
    required: ["field", "value"],
    properties: {
        field: {
            type: "string",
            enum: [
                "status",
                "stageDate",
                "remarks"
            ]
        },
        value: {
            type: "string"
        }
    }
};