import { ActionIcon, Avatar, Group, Menu, ScrollArea, Table, Text } from '@mantine/core';
import {
    IconDots,
    IconMessages,
    IconNote,
    IconPencil,
    IconReportAnalytics,
    IconTrash,
} from '@tabler/icons-react';
import { data } from './ProfileData';
import Home from "../../Home/Home"

export default function Profile() {
    const rows = data.map((item) => (
        <tr className='container mx-auto' key={item.name}>
            <td>
                <Group spacing="sm">
                    <Avatar size={40} src={item.avatar} radius={40} />
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.name}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {item.job}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Text fz="sm">{item.email}</Text>
                <Text fz="xs" c="dimmed">
                    21.16
                </Text>
            </td>
            <td>
                <Text fz="sm">${item.rate} 
                </Text>
                <Text fz="xs" c="dimmed">
                    Rate
                </Text>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <ActionIcon>
                        <IconPencil size="1rem" stroke={1.5} />
                    </ActionIcon>
                    <Menu
                        transitionProps={{ transition: 'pop' }}
                        withArrow
                        position="bottom-end"
                        withinPortal
                    >
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size="1rem" stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item icon={<IconMessages size="1rem" stroke={1.5} />}>Send message</Menu.Item>
                            <Menu.Item icon={<IconNote size="1rem" stroke={1.5} />}>Add note</Menu.Item>
                            <Menu.Item icon={<IconReportAnalytics size="1rem" stroke={1.5} />}>
                                Analytics
                            </Menu.Item>
                            <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} color="red">
                                Terminate contract
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea>
            <Home />
            <Table sx={{ minWidth: 800 }} verticalSpacing="md">
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}