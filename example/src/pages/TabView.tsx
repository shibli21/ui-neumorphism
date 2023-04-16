import React, { useState } from "react";

import {
  H4,
  H6,
  Tab,
  Card,
  Tabs,
  Divider,
  TabItem,
  TabItems,
} from "ui-neumorphism";

import DocCard from "../containers/DocCard";
import ApiCard from "../containers/ApiCard";
import { tabsApi, tabApi, tabItemsApi, tabItemApi } from "../docs/api/tab-api";

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/TabView.jsx";

const TabView = ({ dark }: { dark: boolean }) => {
  const [active, setActive] = useState(0);

  const tabItems = (
    <TabItems value={active}>
      <span id="component"></span>
      <span id="component"></span>

      <TabItem>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </TabItem>
      <TabItem>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </TabItem>
      <TabItem>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </TabItem>
    </TabItems>
  );
  return (
    <Card flat dark={dark}>
      <H4>
        <a href="#component">Tabs</a>
      </H4>
      <H6>
        The Tabs component is used for hiding content behind a selectable item.
      </H6>
      <DocCard
        url={url}
        className="mt-12"
        content={
          <Card flat className="px-4 fill-width">
            <Card className="pa-4">
              <Tabs value={active} onChange={({ active }) => setActive(active)}>
                <Tab>Item 1</Tab>
                <Tab>Item 2</Tab>
                <Tab>Item 3</Tab>
              </Tabs>
              {tabItems}
            </Card>
            <Card rounded className="pa-4 mt-12">
              <Tabs
                rounded
                value={active}
                onChange={({ active }) => setActive(active)}
              >
                <Tab>Item 1</Tab>
                <Tab>Item 2</Tab>
                <Tab>Item 3</Tab>
              </Tabs>
              {tabItems}
            </Card>
            <Card outlined className="pa-4 mt-12">
              <Tabs
                outlined
                value={active}
                onChange={({ active }) => setActive(active)}
              >
                <Tab>Item 1</Tab>
                <Tab>Item 2</Tab>
                <Tab>Item 3</Tab>
              </Tabs>
              {tabItems}
            </Card>
            <Card flat className="pa-4 mt-12">
              <Tabs
                underlined
                value={active}
                onChange={({ active }) => setActive(active)}
              >
                <Tab>Item 1</Tab>
                <Tab>Item 2</Tab>
                <Tab>Item 3</Tab>
              </Tabs>
              {tabItems}
            </Card>
            <Card flat className="pa-4 mt-12">
              <Tabs
                disabled
                value={active}
                onChange={({ active }) => setActive(active)}
              >
                <Tab>Item 1</Tab>
                <Tab>Item 2</Tab>
                <Tab>Item 3</Tab>
              </Tabs>
              {tabItems}
            </Card>
          </Card>
        }
      />
      <Divider dense className="mt-6" />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard dark={dark} entity="Tabs" data={tabsApi(dark)} />
      <div className="mt-12"></div>
      <ApiCard dark={dark} entity="Tab" data={tabApi(dark)} />
      <div className="mt-12"></div>
      <ApiCard dark={dark} entity="TabItems" data={tabItemsApi(dark)} />
      <div className="mt-12"></div>
      <ApiCard dark={dark} entity="TabItem" data={tabItemApi(dark)} />
    </Card>
  );
};

export default TabView;
