import { ExclamationIcon } from "@heroicons/react/solid";

export const UnsafeAlert = () => {
  return (
    <div className="rounded-md bg-yellow-50 p-2 py-4 w-96">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-6 w-6 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-2">
          <h3 className="uppercase font-medium text-lg text-yellow-800">
            Proceed with caution
          </h3>
          <div className="mt-1 font-base text-sm text-yellow-600">
            <p>
              <span className="font-misto">Pozition</span> is an experimental
              project. We are not liable for any loss of funds. We recommend
              reviewing the{" "}
              <a
                className="underline"
                href="https://github.com/davidvuong/pozition"
              >
                source code
              </a>{" "}
              before interacting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
