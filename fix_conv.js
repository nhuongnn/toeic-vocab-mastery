const fs = require("fs");
const payload = JSON.parse(fs.readFileSync("payload.json", "utf8"));

payload.result.words[0].examples.conversation = [
  "Colleague A: 'Did you receive the flight confirmation from the travel agency yet?'\nColleague B: 'Yes, it just arrived in my inbox with all the seat assignments and boarding pass details.'",
  "Manager: 'Has the new hire completed their ninety-day probationary period?'\nHR Specialist: 'We are processing his employment confirmation paperwork today.'"
];

payload.result.words[1].examples.conversation = [
  "Auditor: 'Did the new production line pass the latest stress tests?'\nPlant Manager: 'Yes, every component was tested and verified for complete conformance with safety specifications.'",
  "Project Lead: 'Are our software security protocols meeting industry benchmarks?'\nChief Technology Officer: 'Our recent audit confirmed total conformance with ISO 27001 standards.'"
];

payload.result.words[2].examples.conversation = [
  "HR Manager: 'Can we proceed with contacting the applicant's previous employers?'\nRecruiter: 'Yes, we received her signed consent form this morning.'",
  "Attorney: 'Did the client agree to the settlement terms?'\nParalegal: 'He gave his verbal consent over the phone and is signing the formal agreement now.'"
];

fs.writeFileSync("payload.json", JSON.stringify(payload, null, 2));
console.log("Fixed conversation dialogues in payload.json");
