import Link from "next/link";
import { INQUIRY_STATUSES, listFeedback, listInquiries, type InquiryStatus } from "../../../lib/contact/queries";
import { SUGGEST_PROJECTS } from "../../../lib/contact/options";
import DataTable from "../../_components/DataTable";
import Panel from "../../_components/Panel";
import styles from "../../dashboard.module.css";
import { formatStamp } from "../../format";

function isStatus(value: string | undefined): value is InquiryStatus {
  return !!value && (INQUIRY_STATUSES as readonly string[]).includes(value);
}

function inboxHref(status?: InquiryStatus, project?: string): string {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (project) params.set("project", project);
  const query = params.toString();
  return query ? `/dashboard/inbox?${query}` : "/dashboard/inbox";
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; project?: string }>;
}) {
  const params = await searchParams;
  const status = isStatus(params.status) ? params.status : undefined;
  const project = params.project && SUGGEST_PROJECTS.includes(params.project) ? params.project : undefined;
  const [inquiries, feedback] = await Promise.all([listInquiries(status), listFeedback(project)]);

  return (
    <div className={styles.stack}>
      <Panel
        label="Inquiries"
        action={
          <div className={styles.filters}>
            <Link href={inboxHref(undefined, project)} className={styles.filter} data-active={!status}>
              All
            </Link>
            {INQUIRY_STATUSES.map((item) => (
              <Link
                key={item}
                href={inboxHref(item, project)}
                className={styles.filter}
                data-active={status === item}
              >
                {capitalize(item)}
              </Link>
            ))}
          </div>
        }
      >
        <DataTable
          rows={inquiries}
          rowKey={(row) => row.id}
          empty="No inquiries."
          columns={[
            {
              header: "Name",
              cell: (row) => <Link href={`/dashboard/inbox/inquiries/${row.id}`}>{row.name}</Link>,
            },
            { header: "Email", cell: (row) => row.email },
            { header: "Inspiration", cell: (row) => row.inspiration ?? "—" },
            { header: "Status", cell: (row) => capitalize(row.status) },
            { header: "Received", cell: (row) => formatStamp(row.createdAt) },
          ]}
        />
      </Panel>
      <Panel
        label="Feedback"
        action={
          <div className={styles.filters}>
            <Link href={inboxHref(status)} className={styles.filter} data-active={!project}>
              All
            </Link>
            {SUGGEST_PROJECTS.map((item) => (
              <Link
                key={item}
                href={inboxHref(status, item)}
                className={styles.filter}
                data-active={project === item}
              >
                {item}
              </Link>
            ))}
          </div>
        }
      >
        <DataTable
          rows={feedback}
          rowKey={(row) => row.id}
          empty="No feedback."
          columns={[
            {
              header: "Project",
              cell: (row) => <Link href={`/dashboard/inbox/feedback/${row.id}`}>{row.project}</Link>,
            },
            { header: "Name", cell: (row) => row.name ?? "—" },
            { header: "Problem", cell: (row) => (row.reportsProblem ? "Yes" : "No") },
            { header: "Read", cell: (row) => (row.readAt ? "Read" : "Unread") },
            { header: "Received", cell: (row) => formatStamp(row.createdAt) },
          ]}
        />
      </Panel>
    </div>
  );
}
