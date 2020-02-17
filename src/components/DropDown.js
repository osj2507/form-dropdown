import React, { useState, useEffect, useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import styled from 'styled-components'

const ListHeader = styled.div`
  position: relative;
  margin: 15px 0 0;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  transition: all 0.4s ease-in-out;
  border: 1px solid ${({ opened }) => (opened ? 'rgb(95, 180, 130)' : 'rgba(0, 0, 0, .6)')};
  color: rgba(0, 0, 0, .8);
  border-radius: 4px;
`;

const ListHeaderSearch = styled.input`
  width: 100%;
  border: none;
  padding: 10px;
  outline: none;
  background: none;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  display: inline-block;
  transform: translateZ(0);

  &::placeholder {
    color: rgba(0, 0, 0, .6);
  }
`;

const ListHeaderIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  display: block;
  content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='17' viewBox='0 0 10 15' fill='none'><path d='M1.39726 0L10 8.33333L1.39726 16.6667L0 15.3132L7.20548 8.33333L0 1.35351L1.39726 0Z' fill='%235fb482' /></svg>");
  transition: transform 0.4s ease-in-out;
  transform: rotate(-90deg);
  cursor: pointer;

  ${({ opened }) => (opened ? 'transform: rotate(90deg)' : '')};
`;

const ListWrapper = styled.ul`
  margin: 15px 0 0;
  padding: 10px;
  max-height: 132px;
  overflow: auto;
  list-style: none;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, .6);
  border-radius: 4px;
  transition: visibility 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
      opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  ${({ opened }) => (opened ?
    'opacity: 1; visibility: visible; transform: translate(0%, 0);' :
    'opacity: 0; visibility: hidden; transform: translate(0%, 10px);')};
`;

const ListOption = styled.li`
  display: flex;
  justify-content: flex-start;
  padding: 15px;
  border-top: 1px solid rgba(0, 0, 0, .2);

  &:nth-child(1) {
    border-top: none;
  }
`;

const ManagerInitials = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  margin-right: 15px;
  justify-content: center;
  align-items: center;
  background-color: rgb(126, 208, 200);
  background-color: ${({ randomColor }) => randomColor};
  border-radius: 4px;
  color: rgb(255, 255, 255);
  font-weight: 500;
  text-align: center;
  text-transform: capitalize;
`;

const ManagerInfo = styled.div`

`;

const ManagerName = styled.div`
  color: rgba(0, 0, 0, .8);
  margin-bottom: 4px;
`;

const ManagerEmail = styled.div`
  color: rgba(0, 0, 0, .2);
  font-size: 90%;
  text-transform: lowercase;
`;

const getColor = (id) => {
  return 'hsl(' + 360 * Number(id) / 100 + ',' + '100%,' + '80%)'
}

export const ListOptionSearch = props => {
  const ref = useRef();

  useEffect(() => ref.current.focus(), [ref]);

  return <ListHeaderSearch {...props} ref={ref} />;
};

export const DropDown = ({
  title,
  list,
  initialValue
}) => {
  const [opened, setOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const ref = useRef();

  useEffect(() => {
    if (typeof initialValue !== 'undefined') {
      setSelectedItem(list.find(({ value }) => value === initialValue));
    }
  }, []);

  useClickOutside(ref, () => {
    setOpened(false);
  });

  return (
    <div ref={ref}>
      <ListHeader opened={opened}>
        <ListOptionSearch
          onClick={e => setOpened(true)}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={e => {if (e.key === 'Enter') {setSelectedItem(list.filter(manager => manager.attributes.name.includes(searchTerm))[0]); setOpened(false)}}}
          placeholder={'Choose Manager'}
        />
        <ListHeaderIcon onClick={() => setOpened(!opened)} opened={opened} />
      </ListHeader>
      <ListWrapper
        id="manager"
        name="manager"
        opened={opened}
        onChange={() => setOpened(!opened)}
      >
        {list.filter(manager => manager.attributes.name.includes(searchTerm)).map(manager => (
          <ListOption
            value={manager.id}
            key={manager.id}
            onClick={() => {
              setSelectedItem(manager);
              setOpened(false);
            }}
          >
            <ManagerInitials randomColor={getColor(manager.id)}>
              {manager.attributes.firstName.charAt(0)}{manager.attributes.lastName.charAt(0)}
            </ManagerInitials>
            <ManagerInfo>
              <ManagerName>  
                {manager.attributes.name}
              </ManagerName>
              <ManagerEmail>
                {manager.attributes.firstName}.{manager.attributes.lastName}@kinetar.com
              </ManagerEmail>
            </ManagerInfo>
          </ListOption>
        ))}
      </ListWrapper>

      <ListWrapper
        opened={true}
      >
        {selectedItem ? (
          <ListOption>
            <ManagerInitials randomColor={getColor(selectedItem.id)}>
              {selectedItem.attributes.firstName.charAt(0)}{selectedItem.attributes.lastName.charAt(0)}
            </ManagerInitials>
            <ManagerInfo>
              <ManagerName>  
                {selectedItem.attributes.name}
              </ManagerName>
              <ManagerEmail>
                {selectedItem.attributes.firstName}.{selectedItem.attributes.lastName}@kinetar.com
              </ManagerEmail>
            </ManagerInfo>
          </ListOption>
        ) : (
          <ListOption>
            <ManagerInitials>
              JD
            </ManagerInitials>
            <ManagerInfo>
              <ManagerName>  
                John Doe
              </ManagerName>
              <ManagerEmail>
                john.doe@kinetar.com
              </ManagerEmail>
            </ManagerInfo>
          </ListOption>

        )
      }
      </ListWrapper>
    </div>
  )
};
