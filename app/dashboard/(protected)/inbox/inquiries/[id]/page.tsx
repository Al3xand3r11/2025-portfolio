import Link from "next/link";
import { notFound } from "next/navigation";
import { INQUIRY_STATUSES, getInquiry } from "../../../../../lib/contact/queries";
import { updateInquiryStatus } from "../../../../actions";
import Panel from "../../../../_components/Panel";
import styles from "../../../../dashboard.module.css";
import { formatStamp } from "../../../../format";
import Fields from "../../Fields";

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inquiry = await getInquiry(id);
  if (!inquiry) notFound();

  return (
    <Panel
      label="Inquiry"
      action={
        <Link href="/dashboard/inbox" className={styles.kicker}>
          Back
        </Link>
      }
    >
      <Fields
        items={[
          { label: "Name", value: inquiry.name },
          { label: "Email", value: inquiry.email },
          { label: "Organization", value: inquiry.organization },
          { label: "Budget", value: inquiry.budget },
          { label: "Timeline", value: inquiry.timeline },
          { label: "Inspiration", value: inquiry.inspiration },
          { label: "Status", value: capitalize(inquiry.status) },
          { label: "Received", value: formatStamp(inquiry.createdAt) },
        ]}
      />
      {inquiry.message ? <p className={styles.message}>{inquiry.message}</p> : null}
      <div className={styles.actions}>
        {INQUIRY_STATUSES.filter((status) => status !== inquiry.status).map((status) => (
          <form key={status} action={updateInquiryStatus}>
            <input type="hidden" name="id" value={inquiry.id} />
            <input type="hidden" name="status" value={status} />
            <button type="submit" className={styles.button}>
              {status === "new" ? "Mark new" : status === "replied" ? "Mark replied" : "Archive"}
            </button>
          </form>
        ))}
      </div>
    </Panel>
  );
}
