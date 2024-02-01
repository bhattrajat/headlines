import { notFound } from "next/navigation";

/*** 
  This is needed since Next.js can't match not-found for paths like /test, /fr/test, 
  so we need to manually create a catch all route to catch all not matched routes and route them to 404
***/
export default function NotFoundPage() {
  return notFound();
}
