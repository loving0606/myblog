var v = new Vue({
    el: '#main',
    data: {
        datas: [],
        flag: true,
        selects: [],
        select_jixing_data: '',
        datas2: [],
        select_pingmu_data: '',
        select_rongliang_data: '',
        select_yanse_data: '',
        select_daohuo_data: '',
        jixing_select_key_data: [],
        size_select_key_data: [],
        rongliang_select_key_data: [],
        yanse_select_key_data: [],
        daohuo_select_key_data: [],
        large_price: '',
        small_price: '',
        price1: '',
        price2: '',
        data_item: [
            'jixing', 'size', 'rongliang', 'yanse', 'daima', 'jiage', 'daohuo'
        ],
        addFlag: false
    },
    created: function() {
        this.getDoodsList()
    },
    methods: {
        getDoodsList() {
            var obj = this
            $.getJSON("../data/iphone-12-products.json", function(result, status) {
                for (var i = 0; i < result.products.length; i++) {

                    (function(i) {
                        var temp = []
                        var test = result.products[i].seoUrlToken
                        var sum = test.split('-')
                        temp.push(result.products[i].productLocatorFamily);
                        for (var k = 0; k < sum.length; k++) {
                            if (k == 0) {
                                temp.push(sum[k] + '-英寸')
                            } else if (k == 2) {
                                temp.push(sum[k].toUpperCase())
                            } else if (k == 3) {
                                temp.push(sum[k])
                            }
                        }
                        temp.push(result.products[i].partNumber)

                        if (result.products[i].price.substring(0, result.products[i].price.length - 3).length == 5) {
                            temp.push(result.products[i].price.substring(0, result.products[i].price.length - 3))
                        } else {
                            temp.push('' + result.products[i].price.substring(0, result.products[i].price.length - 3))
                        }
                        var page = result.products[i].partNumber
                        var text = '../data/' + result.products[i].partNumber.substring(0, result.products[i].partNumber.length - 2) + '.json'
                        var objss = {}
                        var objss_jixing = {}
                        $.getJSON(text, function(result, status) {
                            var numbers = result.body.content.deliveryMessage[page].deliveryOptionMessages[0]

                            temp.push(numbers)
                            objss = {
                                'jixing': temp[0],
                                'size': temp[1],
                                'rongliang': temp[2],
                                'yanse': temp[3],
                                'daima': temp[4],
                                'jiage': Number(temp[5]),
                                'daohuo': temp[6]
                            }
                            obj.datas.push(objss)


                            function findElem(arrayToSearch, attr, val) {
                                for (var i = 0; i < arrayToSearch.length; i++) {
                                    if (arrayToSearch[i][attr] == val) {
                                        return i;
                                    }
                                }
                                return -1;
                            }
                            //机型查询关键字数组数据
                            if (obj.jixing_select_key_data.length == 0) {
                                obj.jixing_select_key_data.push(objss)
                            } else if (findElem(obj.jixing_select_key_data, 'jixing', temp[0]) == -1) {
                                obj.jixing_select_key_data.push(objss)
                            }
                            //屏幕查询关键字数组数据  
                            if (obj.size_select_key_data.length == 0) {
                                obj.size_select_key_data.push(objss)
                            } else if (findElem(obj.size_select_key_data, 'size', temp[1]) == -1) {
                                obj.size_select_key_data.push(objss)
                            }
                            //容量查询关键字数组数据  
                            if (obj.rongliang_select_key_data.length == 0) {
                                obj.rongliang_select_key_data.push(objss)
                            } else if (findElem(obj.rongliang_select_key_data, 'rongliang', temp[2]) == -1) {
                                obj.rongliang_select_key_data.push(objss)
                            }
                            //颜色查询关键字数组数据  
                            if (obj.yanse_select_key_data.length == 0) {
                                obj.yanse_select_key_data.push(objss)
                            } else if (findElem(obj.yanse_select_key_data, 'yanse', temp[3]) == -1) {
                                obj.yanse_select_key_data.push(objss)
                            }
                            //到货周期查询关键字数组数据  
                            if (obj.daohuo_select_key_data.length == 0) {
                                obj.daohuo_select_key_data.push(objss)
                            } else if (findElem(obj.daohuo_select_key_data, 'daohuo', temp[6]) == -1) {
                                obj.daohuo_select_key_data.push(objss)
                            }


                        })

                    })(i)

                }
            });

        },
        storts(orders, n) {
            //alert(orders, n)

            if (n == 1) {
                if (this.flag) {
                    this.datas = this.datas.sort(
                        function(a, b) {
                            if (a[orders] < b[orders]) return -1;
                            if (a[orders] > b[orders]) return 1;
                            return 0;
                        }
                    );

                } else {
                    this.datas = this.datas.sort(
                        function(b, a) {
                            if (a[orders] < b[orders]) return -1;
                            if (a[orders] > b[orders]) return 1;
                            return 0;
                        }
                    );
                }
            } else {
                if (this.flag) {
                    this.datas2 = this.datas2.sort(
                        function(a, b) {
                            if (a[orders] < b[orders]) return -1;
                            if (a[orders] > b[orders]) return 1;
                            return 0;
                        }
                    );

                } else {
                    this.datas2 = this.datas2.sort(
                        function(b, a) {
                            if (a[orders] < b[orders]) return -1;
                            if (a[orders] > b[orders]) return 1;
                            return 0;
                        }
                    );
                }
            }

            this.flag = !this.flag
        },

        select_key(n) {

            if (n == 7) {
                window.location.reload()
            }
            var sel;
            var shuxing;
            //var obj = this.datas
            this.datas2 = this.datas
            var chaxun = [
                ['jixing', this.select_jixing_data],
                ['size', this.select_pingmu_data],
                ['rongliang', this.select_rongliang_data],
                ['yanse', this.select_yanse_data],
                ['daohuo', this.select_daohuo_data]
            ]

            $('#table1').hide();
            $('#table2').show();
            for (var i = 0; i < chaxun.length; i++) {
                var temps = []
                if (chaxun[i][1] !== '') {
                    shuxing = chaxun[i][0]
                    sel = chaxun[i][1]
                    this.datas2.forEach((item, key) => {
                        if (item[shuxing] == sel) {
                            var add = {
                                'jixing': item.jixing,
                                'size': item.size,
                                'rongliang': item.rongliang,
                                'yanse': item.yanse,
                                'daima': item.daima,
                                'jiage': item.jiage,
                                'daohuo': item.daohuo
                            }
                            temps.push(add)
                        }
                    })
                    this.datas2 = temps;
                    if (!this.addFlag) {
                        this.addEvents()
                        this.addFlag = true
                    }

                }
            }


        },
        price_select(n) {
            //alert(typeof(this.large_price))
            $('#table1').hide();
            $('#table2').show();
            if (n == 0) {
                var sel = Number($.trim(this.large_price))
                this.select_dayu(sel)
                this.large_price = ''
            } else if (n == 1) {
                var sel2 = Number($.trim(this.small_price))
                this.select_xiaoyu(sel2)
                this.small_price = ''
            } else {
                var sel = Number($.trim(this.price1))
                var sel2 = Number($.trim(this.price2))

                if (sel == 0 && sel2 == 0) {
                    $('#table1').show();
                    $('#table2').hide();
                } else if (sel == 0) {
                    this.select_xiaoyu(sel2)
                } else if (sel2 == 0) {
                    this.select_dayu(sel)
                } else {
                    this.select_betten(sel, sel2)
                }
                this.price1 = ''
                this.price2 = ''
            }
            if (!this.addFlag) {
                this.addEvents()
                this.addFlag = true
            }


        },
        select_dayu(sel) {
            var sel = sel
            var temps = []
            this.datas.forEach((item, key) => {

                if (item['jiage'] > sel) {
                    var add = {
                        'jixing': item.jixing,
                        'size': item.size,
                        'rongliang': item.rongliang,
                        'yanse': item.yanse,
                        'daima': item.daima,
                        'jiage': item.jiage,
                        'daohuo': item.daohuo
                    }
                    temps.push(add)
                }
            })
            this.datas2 = temps;
            if (!this.addFlag) {
                this.addEvents()
                this.addFlag = true
            }
        },
        select_xiaoyu(sel) {
            var sel2 = sel
            var temps2 = []
            this.datas.forEach((item, key) => {
                if (sel2 == 0) {
                    sel2 = 100000000
                }
                if (item['jiage'] < sel2) {
                    var add2 = {
                        'jixing': item.jixing,
                        'size': item.size,
                        'rongliang': item.rongliang,
                        'yanse': item.yanse,
                        'daima': item.daima,
                        'jiage': item.jiage,
                        'daohuo': item.daohuo
                    }
                    temps2.push(add2)
                }
            })
            this.datas2 = temps2;
            if (!this.addFlag) {
                this.addEvents()
                this.addFlag = true
            }
        },
        select_betten(sel, sel2) {
            var sel = sel
            var sel2 = sel2
            var temps2 = []
            this.datas.forEach((item, key) => {
                if (item['jiage'] < sel2 && item['jiage'] > sel) {
                    var add2 = {
                        'jixing': item.jixing,
                        'size': item.size,
                        'rongliang': item.rongliang,
                        'yanse': item.yanse,
                        'daima': item.daima,
                        'jiage': item.jiage,
                        'daohuo': item.daohuo
                    }
                    temps2.push(add2)

                }
            })
            this.datas2 = temps2;
            if (!this.addFlag) {
                this.addEvents()
                this.addFlag = true
            }
        },
        addEvents() {
            var obj = this;
            for (var i = 1; i < $("#table2 th").length; i++) {
                (function(i) {
                    $("#table2 th").eq(i).click(function() {
                        obj.storts('' + obj.data_item[i - 1], 2)
                    })
                })(i)
            }
        },
        checkValue() {
            this.price1 = this.price1.replace(/[^\d]/g, '')
        }
    }
})
$(function() {
    $("#table1").resizableColumns({});
    $("#table2").resizableColumns({});
    $(".el-input").keyup(function() {
        //如果输入非数字，则替换为''，如果输入数字，则在每4位之后添加一个空格分隔
        //this.value = this.value.replace(/[^\d]/g, '');
    })
});