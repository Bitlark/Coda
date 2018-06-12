import json


class MVVMCore:
    def __init__(self):
        self.dataStore = {}
        self.subscribersHub = {}

    def setData(self, key, value):
        self.dataStore[key] = value
        self.emmit(key)

    def emmit(self, key):
        if key in self.subscribersHub:
            for sub in self.subscribersHub[key]:
                sub.update(key, self.dataStore[key])

    def subscribe(self, key, obj):
        if key in self.subscribersHub:
            self.subscribersHub[key].append(obj)
        else:
            self.subscribersHub[key] = [obj]

    def toJson(self):
        print('store:{}'.format(json.dumps(self.dataStore)))
        print('subscribersHub:{}'.format(json.dumps(self.subscribersHub)))


class Sub:
    def __init__(self, name):
        self.name = name
        print('初始化Sub：{}'.format(name))

    def subscribe(self, system, key):
        print('[{}]: Subscribe => {}'.format(self.name, key))
        system.subscribe(key, self)

    def update(self, key, value):
        print('[{}]: Render Update => {}:{}'.format(self.name, key, value))


wxcore = MVVMCore()
print('---初始化----')
print(wxcore.toJson())
print('--设置数据---')
wxcore.setData('word', 'hello word')
wxcore.setData('age', 12)
wxcore.setData('height', 180)
print(wxcore.toJson())
print('--订阅者实例---')
templte1 = Sub('template1')
templte2 = Sub('template2')
templte3 = Sub('template3')
print('---订阅-----')
templte1.subscribe(wxcore, 'word')
templte2.subscribe(wxcore, 'age')
templte3.subscribe(wxcore, 'height')
print('---触发dataChange---')
wxcore.setData('height', 900)
