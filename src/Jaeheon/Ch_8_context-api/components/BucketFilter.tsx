import React, { useContext, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import BucketContext from "../contexts/BucketContext";

type Props = {};

const BucketFilter = (props: Props) => {
  const value = useContext(BucketContext);
  const [selection, setSelection] = useState<string>("모두");

  const selectFilter = (eventKey: string | null, e: any) => {
    if (eventKey) {
      value?.actions.changeFilterStatus(eventKey);
      setSelection(e.target.innerText);
    }
  };

  return (
    <DropdownButton
      id="dropdown-item-button"
      title={selection}
      onSelect={selectFilter}
      className="position-absolute top-0 end-0 my-3"
    >
      <Dropdown.Item as="button" eventKey="all">
        모두
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey="done">
        성공
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey="not-done">
        아직...
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default BucketFilter;
