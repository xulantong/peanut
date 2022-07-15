export default [
    {
        component: "FiledContainer",
        fileds: [
            {
                dataIndex: "qzgw",
                label: "求职岗位",
                type: "string",
                editable: true
            },
            {
                dataIndex: "gzdd",
                label: "工作地点",
                type: "string",
                editable: true
            },
        ],
    },
    {
        component: "PartContainer",
        header: '个人基础信息',
        children: [
            {
                component: "FiledContainer",
                fileds: [
                    {
                        dataIndex: "name",
                        label: "姓名",
                        type: "string",
                        editable: true
                    },
                    {
                        dataIndex: "csrq",
                        label: "出生日期",
                        showStar: true,
                        type: "string"
                    },
                    {
                        dataIndex: "age",
                        label: "年龄",
                        showStar: true,
                        type: "string"
                    },
                    {
                        dataIndex: "sex",
                        label: "性别",
                        showStar: true,
                        type: "string"
                    },
                    {
                        dataIndex: "jg",
                        label: "籍贯",
                        showStar: true,
                        type: "string"
                    },

                ],
            },
            {
                component: "FiledContainer",
                fileds: [
                    {
                        dataIndex: "xl",
                        label: "学历",
                        type: "string",
                        editable: true
                    },
                    {
                        dataIndex: "zzmm",
                        label: "政治面貌",
                        type: "string",
                        editable: true
                    },
                    {
                        dataIndex: "byyx",
                        label: "毕业院校",
                        showStar: true,
                        type: "string"
                    },
                    {
                        dataIndex: "zyfx",
                        label: "专业方向",
                        showStar: true,
                        type: "string"
                    },
                ],
            },
            {
                component: "FiledContainer",
                fileds: [
                    {
                        dataIndex: "lxfs",
                        label: "联系方式",
                        type: "string",
                        editable: true
                    },
                    {
                        dataIndex: "email",
                        label: "邮箱",
                        type: "string",
                        editable: true
                    },
                    {
                        dataIndex: "csdn",
                        label: "CSDN",
                        showStar: true,
                        type: "string"
                    },
                    {
                        dataIndex: "github",
                        label: "gutHub",
                        showStar: true,
                        type: "string"
                    },
                ],
            },
        ]
    },
    {
        component: "PartContainer",
        header: '工作经历',
        children: [
            {
                component: "DataTable",
                dataIndex: "gzjlList",
                columns: [
                    {
                        label: "入职时间",
                        prop: "startTime",
                        minWidth:100,
                    },
                    {
                        label: "离职时间",
                        prop: "endTime",
                        minWidth:100,

                    },
                    {
                        label: "工作岗位",
                        prop: "post",
                        minWidth:100,

                    },
                    {
                        label: "主要职能",
                        prop: "workContent",
                        minWidth:400
                    }
                ]

            }
        ]
    },


]

