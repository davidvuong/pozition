import { ExclamationIcon } from "@heroicons/react/solid";

export const UnsafeAlert = () => {
  return (
    <div className="rounded-md bg-yellow-50 p-4 w-96">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 -mt-1">
          <h3 className="uppercase font-medium text-lg text-yellow-800">
            Proceed with caution
          </h3>
          <div className="mt-2 font-base text-yellow-700">
            <p>
              Pozition.finance is an experimental project. We will not liable
              for any loss of funds. Review{" "}
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
