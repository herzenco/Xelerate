import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listAuditEvents } from "@/lib/admin/content-store";

export const metadata: Metadata = {
  title: "Audit Log",
};

export const dynamic = "force-dynamic";

export default async function AdminAuditPage() {
  const events = await listAuditEvents();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Audit Log</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The most recent 100 state-changing admin actions will appear here.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Action</th>
                  <th className="px-4 py-3 text-left font-medium">Resource</th>
                  <th className="px-4 py-3 text-left font-medium">Actor</th>
                  <th className="px-4 py-3 text-left font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-t border-border">
                    <td className="px-4 py-4 font-medium">{event.action}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {event.resourceType}
                      {event.resourceId ? ` / ${event.resourceId}` : ""}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {event.actorEmail}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {new Date(event.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-muted-foreground" colSpan={4}>
                      No audit events yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
