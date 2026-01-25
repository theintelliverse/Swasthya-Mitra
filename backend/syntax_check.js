try {
    require("./controllers/auth.controller");
    console.log("Syntax OK");
} catch (e) {
    console.error("Syntax Error:", e.message);
    process.exit(1);
}
