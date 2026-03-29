/**
 * Agent 13 – Safety / Off-Topic Agent
 * Returns a fixed message for off-topic queries.
 */

export async function handleOffTopic(userMessage) {
    return {
        type: "OFF_TOPIC",
        response: "I'm PC Build, and I specialize in PC building and hardware! I can help you with:\n\n" +
            "- Component suggestions (GPUs, CPUs, RAM, storage, etc.)\n" +
            "- Complete build recommendations (Tell me your use case and budget)\n" +
            "- Compatibility checks (Make sure your parts work together)\n" +
            "- Hardware knowledge (Learn about specs, technologies, and more)\n\n" +
            "Please ask me something about PC building, and I'll be happy to help!"
    };
}
