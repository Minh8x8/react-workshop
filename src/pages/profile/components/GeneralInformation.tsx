import { Input, Button } from "@components/ui";

const GeneralInformation = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-sm border shadow mt-4">
      <h2 className="font-semibold text-md text-black dark:text-white">
        General information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="mb-1 font-medium text-black dark:text-white"
          >
            First Name
          </label>
          <Input id="firstName" placeholder="First Name" disabled />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Last Name
          </label>
          <Input id="lastName" placeholder="Last Name" disabled />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Country
          </label>
          <Input id="country" placeholder="Country" disabled />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="city"
            className="mb-1 font-medium text-black dark:text-white"
          >
            City
          </label>
          <Input id="city" placeholder="City" disabled />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="address"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Address
          </label>
          <Input id="address" placeholder="Address" disabled />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Email
          </label>
          <Input id="email" placeholder="Email" disabled type="email" />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="phoneNumber"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            placeholder="Phone Number"
            disabled
            type="tel"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="birthday"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Birthday
          </label>
          <Input id="birthday" placeholder="Birthday" disabled type="date" />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="organization"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Organization
          </label>
          <Input id="organization" placeholder="Company Name" disabled />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="role"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Role
          </label>
          <Input id="role" placeholder="Role" disabled />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="department"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Department
          </label>
          <Input id="department" placeholder="Department" disabled />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="zipPostalCode"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Zip/Postal Code
          </label>
          <Input id="zipPostalCode" placeholder="Zip/Postal Code" disabled />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button>Edit</Button>
        <Button>KYC</Button>
      </div>
    </div>
  );
};

export default GeneralInformation;
