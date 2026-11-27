import Link from "next/link";
import { notFound } from "next/navigation";
import { RATING_QUESTIONS } from "../../../../../lib/contact/options";
import { getFeedback } from "../../../../../lib/contact/queries";
import { markFeedbackAsRead } from "../../../../actions";
import Panel from "../../../../_components/Panel";
import styles from "../../../../dashboard.module.css";
import { formatStamp } from "../../../../format";
import Fields from "../../Fields";

export default async function FeedbackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const feedback = await getFeedback(id);
  if (!feedback) notFound();

  const ratings = RATING_QUESTIONS.map((question) => ({
    label: question.question,
    value: feedback[question.name] == null ? null : String(feedback[question.name]),
  }));

  return (
    <Panel
      label="Feedback"
      action={
        <Link href="/dashboard/inbox" className={styles.kicker}>
          Back
        </Link>
      }
    >
      <Fields
        items={[
          { label: "Project", value: feedback.project },
          { label: "Name", value: feedback.name },
          { label: "Problem", value: feedback.reportsProblem ? "Yes" : "No" },
          { label: "Read", value: feedback.readAt ? formatStamp(feedback.readAt) : "Unread" },
          { label: "Received", value: formatStamp(feedback.createdAt) },
          ...ratings,
        ]}
      />
      {feedback.message ? <p className={styles.message}>{feedback.message}</p> : null}
      {feedback.readAt ? null : (
        <form action={markFeedbackAsRead}>
          <input type="hidden" name="id" value={feedback.id} />
          <button type="submit" className={styles.button}>
            Mark read
          </button>
        </form>
      )}
    </Panel>
  );
}
