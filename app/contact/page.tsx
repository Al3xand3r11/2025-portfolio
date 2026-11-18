import { getGitHubActivity } from "../lib/github";
import ContactView from "./ContactView";

export default async function ContactPage() {
  const github = await getGitHubActivity();
  return <ContactView github={github} />;
}
