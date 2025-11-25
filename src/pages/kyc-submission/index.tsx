import { useState } from "react";
import { Button } from "@components/ui";
import { cn } from "@lib/utils";

type SubmissionStatus = "Active" | "Pending" | "Inactive";

type Submission = {
  id: number;
  name: string;
  status: SubmissionStatus;
  date: string;
};

const statusStyles: Record<SubmissionStatus, string> = {
  Active:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100",
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100",
  Inactive: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100",
};

const initialSubmissions: Submission[] = [
  { id: 1, name: "John Doe", status: "Active", date: "2024-12-01" },
  { id: 2, name: "Jane Smith", status: "Active", date: "2024-12-05" },
  { id: 3, name: "Michael Johnson", status: "Pending", date: "2024-11-20" },
  { id: 4, name: "Michael Johnson", status: "Inactive", date: "2024-11-20" },
];

type DialogState =
  | {
      isOpen: true;
      submission: Submission;
      action: "approve" | "reject";
    }
  | {
      isOpen: false;
      submission?: undefined;
      action?: undefined;
    };

const StatusBadge = ({ status }: { status: SubmissionStatus }) => {
  return (
    <span
      className={cn(
        "inline-flex min-w-24 items-center justify-center rounded-full px-3 py-1 text-sm font-semibold",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
};

const ConfirmationDialog = ({
  state,
  onConfirm,
  onClose,
}: {
  state: DialogState;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  if (!state.isOpen) return null;

  const { action, submission } = state;
  const label = action === "approve" ? "approve" : "reject";

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Submission Action
          </h3>
          <button
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-6 text-gray-800">
          <p className="text-base">
            Are you sure you want to {label} the submission for{" "}
            <span className="font-semibold">{submission.name}</span>?
          </p>
        </div>
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <Button
            type="button"
            variant="secondary"
            className="min-w-28 bg-emerald-700 text-white hover:bg-emerald-600"
            onClick={onConfirm}
          >
            Yes, I&apos;m sure
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            No, cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const DataTable = ({
  submissions,
  onActionClick,
}: {
  submissions: Submission[];
  onActionClick: (submission: Submission, action: "approve" | "reject") => void;
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-700">
      <div className="border-b bg-gray-50 px-6 py-4 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          KYC Submission
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-50">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-50">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-50">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((submission, index) => (
              <tr
                key={submission.id}
                className={cn(
                  index % 2 === 1 ? "bg-gray-50/50 dark:bg-gray-700/50" : ""
                )}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {submission.name}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={submission.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {submission.date}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-800/20"
                      onClick={() => onActionClick(submission, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-800/20"
                      onClick={() => onActionClick(submission, "reject")}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end gap-2 border-t bg-gray-50 px-6 py-3 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        <Button type="button" variant="outline" className="pointer-events-none">
          Previous
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="bg-cyan-100 text-cyan-900 hover:bg-cyan-200 dark:bg-cyan-800 dark:text-cyan-100 dark:hover:bg-cyan-700"
        >
          1
        </Button>
        <Button
          type="button"
          variant="outline"
          className="pointer-events-none dark:text-gray-200"
        >
          2
        </Button>
        <Button
          type="button"
          variant="outline"
          className="pointer-events-none dark:text-gray-200"
        >
          3
        </Button>
        <Button
          type="button"
          variant="outline"
          className="pointer-events-none dark:text-gray-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const KycSubmission = () => {
  const [submissions, setSubmissions] =
    useState<Submission[]>(initialSubmissions);
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
  });

  const handleActionClick = (
    submission: Submission,
    action: "approve" | "reject"
  ) => {
    setDialogState({ isOpen: true, submission, action });
  };

  const handleConfirm = () => {
    if (!dialogState.isOpen) return;
    const { submission, action } = dialogState;
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === submission.id
          ? { ...item, status: action === "approve" ? "Active" : "Inactive" }
          : item
      )
    );
    setDialogState({ isOpen: false });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <DataTable submissions={submissions} onActionClick={handleActionClick} />
      <ConfirmationDialog
        state={dialogState}
        onConfirm={handleConfirm}
        onClose={() => setDialogState({ isOpen: false })}
      />
    </div>
  );
};

export default KycSubmission;
