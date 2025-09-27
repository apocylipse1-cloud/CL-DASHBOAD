import { NextResponse } from "next/server";
import { google } from "googleapis";

type ProjectRecord = {
  projectName: string;
  phase: string;
  progressPercent: number;
  assignedEditor: string;
  deadline: string; // ISO
  latestUpdate: string;
  deliverables: Array<{ title: string; href: string }>
};

function getMockProject(id: string): ProjectRecord {
  return {
    projectName: `Project ${id}`,
    phase: "Draft",
    progressPercent: 64,
    assignedEditor: "Alex Rivera",
    deadline: new Date(Date.now() + 12 * 86400000).toISOString(),
    latestUpdate: "Draft sent on Sept 24, awaiting feedback.",
    deliverables: [
      { title: "Teaser v1", href: "#" },
      { title: "Full Cut v1", href: "#" },
      { title: "Color Pass", href: "#" },
    ],
  };
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const sheetId = process.env.SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!sheetId || !clientEmail || !privateKey) {
    // Fallback to mock when not configured
    return NextResponse.json(getMockProject(id), { status: 200 });
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    // Expected headers:
    // Project Name | Phase | % Progress | Assigned Editor | Deadline | Latest Update | Deliverables
    const range = "Dashboard!A2:G";
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    const rows = data.values || [];
    // For now, return first row (or mock if none)
    const row = rows[0] || [];
    const [projectName, phase, progressStr, assignedEditor, deadline, latestUpdate, deliverablesStr] = row as string[];
    const progressPercent = Number(progressStr ?? 0) || 0;
    const deliverables = (deliverablesStr || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, href] = line.split(" | ");
        return { title: title?.trim() || "Untitled", href: (href || "#").trim() };
      });

    const payload: ProjectRecord = {
      projectName: projectName || `Project ${id}`,
      phase: phase || "Draft",
      progressPercent,
      assignedEditor: assignedEditor || "TBD",
      deadline: deadline || new Date().toISOString(),
      latestUpdate: latestUpdate || "",
      deliverables: deliverables.length ? deliverables : getMockProject(id).deliverables,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch {
    return NextResponse.json(getMockProject(id), { status: 200 });
  }
}

