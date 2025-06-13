import { TestBed } from '@angular/core/testing';
import { PinInputService, Keys, AVAILABLE_PINS } from './use-pin-input';

describe('PinInputService', () => {
  let service: PinInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinInputService]
    });
    service = TestBed.inject(PinInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create()', () => {
    it('should create a pin input controller with default empty value', () => {
      const controller = service.create({ pinCount: 4 });
      expect(controller.value()).toEqual([]);
    });

    it('should create a pin input controller with initial value', () => {
      const initialValue = [1, 2, 3];
      const controller = service.create({ pinCount: 4, value: initialValue });
      expect(controller.value()).toEqual(initialValue);
    });

    it('should call onChange when value changes', () => {
      const onChange = jasmine.createSpy('onChange');
      const controller = service.create({ pinCount: 4, onChange });

      // Initial call
      expect(onChange).toHaveBeenCalledWith([]);

      // After value change
      controller.handleClickValue(5);
      expect(onChange).toHaveBeenCalledWith([5]);
    });

    describe('handleClickValue()', () => {
      it('should add value to the end of array', () => {
        const controller = service.create({ pinCount: 4 });
        controller.handleClickValue(5);
        expect(controller.value()).toEqual([5]);
      });

      it('should not exceed pinCount limit', () => {
        const controller = service.create({ pinCount: 2 });
        controller.handleClickValue(1);
        controller.handleClickValue(2);
        controller.handleClickValue(3); // Should be ignored
        expect(controller.value()).toEqual([1, 2]);
      });
    });

    describe('handleClickBackspace()', () => {
      it('should remove the last value', () => {
        const controller = service.create({ pinCount: 4, value: [1, 2, 3] });
        controller.handleClickBackspace();
        expect(controller.value()).toEqual([1, 2]);
      });

      it('should do nothing on empty array', () => {
        const controller = service.create({ pinCount: 4 });
        controller.handleClickBackspace();
        expect(controller.value()).toEqual([]);
      });
    });

    describe('handleButton()', () => {
      it('should add number at specified index', () => {
        const controller = service.create({ pinCount: 4, value: [1, 2] });
        controller.handleButton(1, '5');
        expect(controller.value()).toEqual([1, 5]);
      });

      it('should handle backspace button', () => {
        const controller = service.create({ pinCount: 4, value: [1, 2, 3] });
        controller.handleButton(2, Keys.BACKSPACE);
        expect(controller.value()).toEqual([1, 2]);
      });

      it('should not handle unrecognized buttons', () => {
        const controller = service.create({ pinCount: 4, value: [1, 2] });
        controller.handleButton(1, 'InvalidKey');
        expect(controller.value()).toEqual([1, 2]);
      });
    });
  });
}); 