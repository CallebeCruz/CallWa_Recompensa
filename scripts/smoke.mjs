import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
});

const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const errors = [];
const failedResources = [];
page.on("console", (message) => {
  if (message.type() === "error" && !message.text().includes("404")) errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400) failedResources.push(`${response.status()} ${response.url()}`);
});

await page.goto(process.env.CALLWA_PREVIEW_URL ?? "http://127.0.0.1:4173", { waitUntil: "networkidle" });
await page.screenshot({ path: "/tmp/callwa-home.png" });
const nightToggle = page.getByRole("button", { name: "Mostrar céu de noite" });
if (await nightToggle.count()) await nightToggle.click();
await page.screenshot({ path: "/tmp/callwa-night.png" });

await page.getByRole("button", { name: "Enviar uma luz para Leo" }).click();
await page.getByRole("dialog").waitFor();
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/callwa-sheet.png" });

await page.getByRole("button", { name: /Bom dia/ }).click();
await page.getByRole("button", { name: /Uma faísca está esperando/ }).waitFor();
await page.getByRole("button", { name: /Uma faísca está esperando/ }).click();
await page.getByText("13 trocas de luz").waitFor();
await page.screenshot({ path: "/tmp/callwa-exchange.png" });

if (errors.length) {
  throw new Error(`Browser console errors:\n${errors.join("\n")}`);
}

if (failedResources.length) {
  throw new Error(`Failed browser resources:\n${failedResources.join("\n")}`);
}

console.log("smoke passed: home, message sheet, spark and completed exchange");
await browser.close();
