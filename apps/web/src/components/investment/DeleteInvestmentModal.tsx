import { AlertTriangle, X } from "lucide-react";

interface DeleteInvestmentModalProps {
  isOpen: boolean;
  investmentName: string;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteInvestmentModal({
  isOpen,
  investmentName,
  onClose,
  onConfirm,
}: DeleteInvestmentModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-stone-100 p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-2 text-red-500">
              <AlertTriangle size={18} strokeWidth={1.8} />
            </div>

            <h2 className="text-lg font-medium text-stone-900">
              Delete Investment
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-full p-2 text-stone-400 transition-transform duration-300 hover:scale-105 hover:bg-stone-200 hover:text-stone-800"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <p className="mt-5 text-sm font-extralight leading-6 text-stone-600">
          Are you sure you want to delete{" "}
          <span className="font-medium text-stone-900">{investmentName}</span>{" "}
          investment?
        </p>

        <p className="mt-1 text-xs font-extralight text-stone-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-linear-to-r from-stone-100 to-stone-300 px-6 py-2.5 text-sm font-extralight text-stone-600 transition-transform duration-300 hover:scale-105"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-full bg-linear-to-r from-red-100 to-red-500 px-6 py-2.5 text-sm font-extralight text-white transition-transform duration-300 hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteInvestmentModal;
