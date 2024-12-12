import SettingContext from "@/service/SettingContext";
import { Setting } from "@/types/setting";
import { memo, useState, useEffect, useLayoutEffect } from "react";

import {  Form, ItemGroup, SliderWithInput } from '@lobehub/ui';

import { FORM_STYLE } from '@/const/layoutTokens';

const SettingAgent = memo(() => {
    const [setting, setSetting] = useState<Setting | null>(null);


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
    }

    useLayoutEffect(() => {
        form.setFieldsValue(setting);
    }, [setting]);

    const chat: ItemGroup = {
        children: [
            {
                children: <SliderWithInput max={10000} min={0} />,
                label: "响应最大token",
                name: 'maxToken',
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
