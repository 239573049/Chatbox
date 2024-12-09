import SettingContext from "@/service/SettingContext";
import { Setting } from "@/types/setting";
import { memo, useState, useEffect, useLayoutEffect } from "react";

import { EmojiPicker, Form, ItemGroup, SliderWithInput } from '@lobehub/ui';
import { Input, message } from 'antd';

import { FORM_STYLE } from '@/const/layoutTokens';
import { useGlobalStore } from "@/store/global";
import { useChatStore } from "@/store/chat";

const SettingAgent = memo(() => {
    const [setting, setSetting] = useState<Setting | null>(null);

    const [setMeta] = useChatStore((state) => [state.setMeta])

    const loadSetting = async () => {
        const setting = await SettingContext.GetSetting();
        setSetting(setting);
    }

    useEffect(() => {
        loadSetting();
    }, []);

    const [form] = Form.useForm();

    const updateConfig = async (changedFields: any) => {
        if (!setting) return;
        if (changedFields.avatar) {
            setting.avatar = changedFields.avatar;
        }
        if (changedFields.apiKey) {
            setting.apiKey = changedFields.apiKey;
        }
        if (changedFields.maxToken) {
            setting.maxToken = changedFields.maxToken;
        }
        if (changedFields.nickname) {
            setting.nickname = changedFields.nickname;
        }
        
        setSetting(setting);

        await SettingContext.SaveSetting(setting!)
        setMeta({
            avatar: setting.avatar,
            nickname: setting.nickname
        })

    }

    useLayoutEffect(() => {
        form.setFieldsValue(setting);
    }, [setting]);

    const chat: ItemGroup = {
        children: [
            {
                children: <EmojiPicker />,
                label: "用户头像",
                name: 'avatar',
            },
            {
                children: <Input placeholder="API Key" />,
                label: "用户密钥",
                name: 'apiKey',
            },
            {
                children: <SliderWithInput max={10000} min={0} />,
                label: "响应最大token",
                name: 'maxToken',
            },
            {
                children: <Input placeholder="用户昵称" />,
                label: "用户昵称",
                name: 'nickname',
            },
        ],
        title: "Chat Settings",
    };

    return (
        <Form
            form={form}
            items={[chat]}
            style={{
                overflow: 'hidden',
            }}
            itemsType={'group'}
            onValuesChange={updateConfig}
            variant={'pure'}
            {...FORM_STYLE}
        />
    );
})

export default SettingAgent;
