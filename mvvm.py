import json


class MVVMCore:
    def __init__(self):
        self.data_store = {}
        self.subs_hub = {}

    def set_data(self, key, value):
        self.data_store[key] = value
        self.emmit(key)

    def emmit(self, key):
        if key in self.subs_hub:
            for sub in self.subs_hub[key]:
                sub.update(key, self.data_store[key])

    def subscribe(self, key, obj):
        if key in self.subs_hub:
            self.subs_hub[key].append(obj)
        else:
            self.subs_hub[key] = [obj]

    def unsubscribe(self, key, obj):
        if key in self.subs_hub:
            self.subs_hub[key].remove(obj)

    def to_json(self):
        print('store:{}'.format(json.dumps(self.data_store)))
        print('subs_hub:{}'.format(json.dumps(self.subs_hub)))


class Temp:
    def __init__(self, name, mount):
        self.name = name
        self.mount = mount
        print('初始化Temp：{}'.format(name))

    def subscribe(self, key):
        print('[{}]: Subscribe => {}'.format(self.name, key))
        self.mount.subscribe(key, self)

    def unsubscribe(self, key):
        print('[{}]: Unsubscribe => {}'.format(self.name, key))
        self.mount.unsubscribe(key, self)

    def update(self, key, value):
        print('[{}]: Template Update => {}:{}'.format(self.name, key, value))


wxcore = MVVMCore()
print('---初始化----')
print(wxcore.to_json())
print('--设置数据---')
wxcore.set_data('word', 'hello word')
wxcore.set_data('age', 12)
wxcore.set_data('height', 180)
print(wxcore.to_json())
print('--订阅者实例---')
templte1 = Temp('template1', wxcore)
templte2 = Temp('template2', wxcore)
templte3 = Temp('template3', wxcore)
print('---订阅-----')
templte1.subscribe('word')
templte1.subscribe('age')
templte2.subscribe('age')
templte3.subscribe('height')
print('---触发dataChange Height---')
wxcore.set_data('height', 900)
print('---触发dataChange Age---')
wxcore.set_data('age', 900)
print('---templte1 解绑---')
templte1.unsubscribe('age')
print('---触发dataChange Age---')
wxcore.set_data('age', 100)
