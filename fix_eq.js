const fs = require("fs");
const payload = JSON.parse(fs.readFileSync("payload.json", "utf8"));

payload.result.words[0].toeicContext.exampleQuestion = "All workshop attendees will receive an email _____ containing their assigned seminar room and schedule as soon as their registration fee is processed.\n(A) confirmation\n(B) confirming\n(C) confirmed\n(D) confirm";

payload.result.words[1].toeicContext.exampleQuestion = "Factory supervisors must conduct weekly equipment audits to ensure ongoing _____ with occupational health and safety regulations.\n(A) conformance\n(B) conforming\n(C) conform\n(D) conformable";

payload.result.words[2].toeicContext.exampleQuestion = "According to company policy, background checks cannot be conducted on prospective employees without their explicit written _____.\n(A) consent\n(B) content\n(C) container\n(D) context";

fs.writeFileSync("payload.json", JSON.stringify(payload, null, 2));
console.log("Fixed example questions in payload.json");
