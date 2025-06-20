import React, { useState } from 'react';
//import Button from '@/components/ui/button';
//import Checkbox from '@/components/ui/checkbox';
import { BoxedTableWrapper } from '../table/boxedTableWrapper';
import { TableColumn } from '../layout/commonTable';

// This is a new type specific to the banner edit form
type BannerFormState = {
  id?: string;
  location?: string;
  isPhoto?: boolean;
  isLocation?: boolean;
  isMap?: boolean;
  district_name?: string;
  display?: string;
  amount?: string;
  size?: string;
  announcement?: string;
  CountArea?: string;
  done?: string;
  isForAdmin?: boolean;
  note?: string;
};

interface BannerEditFormProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  selectedRow: unknown;
}

function BannerEditForm<T>({
  columns,
  data,
  selectedRow,
}: BannerEditFormProps<T>) {
  const [formState, setFormState] = useState<BannerFormState>(
    (selectedRow as BannerFormState) || {}
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // The UI here should be adjusted to match the fields for the banner display context.
  // This is a simplified version based on the old "fields" prop.
  return (
    <div className="max-h-[80vh] overflow-y-auto pr-4">
      <div className="grid grid-cols-2 gap-4">
        <label>
          NO
          <input
            name="id"
            value={formState.id || ''}
            onChange={handleInputChange}
            className="border-b"
          />
        </label>
        <label>
          위치
          <input
            name="location"
            value={formState.location || ''}
            onChange={handleInputChange}
            className="border-b"
          />
        </label>
        {/* Add other fields as needed based on the old `fields` prop */}
      </div>
      <BoxedTableWrapper columns={columns} data={data} />
    </div>
  );
}
export default BannerEditForm;
